// Global request queue to prevent simultaneous API calls and rate limiting
class RequestQueue {
  constructor() {
    this.queue = [];
    this.isProcessing = false;
    this.lastRequestTime = 0;
    this.minDelay = 2000; // Increased delay between requests in ms
    this.globalCooldown = false;
    this.cooldownUntil = 0;
  }

  async addRequest(requestFn) {
    return new Promise((resolve, reject) => {
      this.queue.push({ requestFn, resolve, reject });
      this.processQueue();
    });
  }

  async processQueue() {
    if (this.isProcessing || this.queue.length === 0) {
      return;
    }

    this.isProcessing = true;

    while (this.queue.length > 0) {
      const { requestFn, resolve, reject } = this.queue.shift();
      
      try {
        // Check if we're in global cooldown
        const now = Date.now();
        if (this.globalCooldown && now < this.cooldownUntil) {
          const remainingCooldown = this.cooldownUntil - now;
          console.log(`RequestQueue: In global cooldown, waiting ${remainingCooldown}ms`);
          await new Promise(resolve => setTimeout(resolve, remainingCooldown));
          this.globalCooldown = false;
        }
        
        // Ensure minimum delay between requests
        const timeSinceLastRequest = now - this.lastRequestTime;
        const delayNeeded = Math.max(0, this.minDelay - timeSinceLastRequest);
        
        if (delayNeeded > 0) {
          console.log(`RequestQueue: Delaying request by ${delayNeeded}ms`);
          await new Promise(resolve => setTimeout(resolve, delayNeeded));
        }

        const result = await requestFn();
        this.lastRequestTime = Date.now();
        resolve(result);
      } catch (error) {
        // For rate limiting errors, activate global cooldown
        if (error.response && error.response.status === 429) {
          console.log('RequestQueue: Rate limit detected, activating global cooldown');
          this.globalCooldown = true;
          this.cooldownUntil = Date.now() + 10000; // 10 second global cooldown
          
          const rateLimitDelay = 8000; // 8 second delay for rate limiting
          await new Promise(resolve => setTimeout(resolve, rateLimitDelay));
          
          // Re-queue the request after rate limit delay
          this.queue.unshift({ requestFn, resolve, reject });
        } else {
          reject(error);
        }
      }
    }

    this.isProcessing = false;
  }

  // Clear queue (useful for logout or navigation)
  clearQueue() {
    this.queue = [];
    this.globalCooldown = false;
    this.cooldownUntil = 0;
  }

  // Get queue status for debugging
  getStatus() {
    return {
      queueLength: this.queue.length,
      isProcessing: this.isProcessing,
      globalCooldown: this.globalCooldown,
      cooldownUntil: this.cooldownUntil,
      timeUntilCooldownEnd: Math.max(0, this.cooldownUntil - Date.now())
    };
  }
}

// Create singleton instance
export const requestQueue = new RequestQueue();
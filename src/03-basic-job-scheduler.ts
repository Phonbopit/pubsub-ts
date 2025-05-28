type JobFunction = () => void | Promise<void>

class BasicJobScheduler {
  private jobIdCounter = 0
  private jobs: Map<
    string,
    { type: 'timeout' | 'interval'; timer: NodeJS.Timeout }
  > = new Map()

  scheduleOnce(delayMs: number, task: JobFunction): string {
    const jobId = `job-${this.jobIdCounter++}`
    const timeout = setTimeout(async () => {
      try {
        await task()
      } catch (error) {
        console.error(`Job ${jobId} failed:`, error)
      } finally {
        this.jobs.delete(jobId)
      }
    }, delayMs)
    this.jobs.set(jobId, { type: 'timeout', timer: timeout })
    return jobId
  }

  scheduleInterval(intervalMs: number, task: JobFunction): string {
    const jobId = `job-${this.jobIdCounter++}`
    const interval = setInterval(async () => {
      try {
        await task()
      } catch (error) {
        console.error(`Job ${jobId} failed:`, error)
      }
    }, intervalMs)
    this.jobs.set(jobId, { type: 'interval', timer: interval })
    return jobId
  }

  cancelJob(jobId: string): void {
    const job = this.jobs.get(jobId)
    if (job) {
      clearTimeout(job.timer)
      this.jobs.delete(jobId)
    }
  }

  cancelAllJobs(): void {
    for (const [jobId] of this.jobs) {
      this.cancelJob(jobId)
    }
  }

  getActiveJobCount(): number {
    return this.jobs.size
  }
}

export default BasicJobScheduler

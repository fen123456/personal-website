export class Timer {
  lastAccessed: number
  time: number
  active: boolean

  constructor(active: boolean = false) {
    this.lastAccessed = Date.now()
    this.time = 0
    this.active = active
  }
  getTime(): number {
    const currentTime = Date.now()
    const delta = currentTime - this.lastAccessed
    this.lastAccessed = currentTime
    this.time = this.active ? this.time + delta : this.time

    return this.time
  }
  pause(): void {
    this.getTime()
    this.active = false
  }
  reset(): void {
    this.getTime()
    this.time = 0
  }
  start(): void {
    this.getTime()
    this.active = true
  }
}

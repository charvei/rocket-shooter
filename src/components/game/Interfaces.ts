export interface Tickable {
    tick(delta: number, ...args: any[]): void
}
/**
 * LazyForEach 的通用数据源。
 *
 * 长列表必须走 LazyForEach + IDataSource，禁止用 ForEach 渲染分页列表——
 * ForEach 会一次性创建全部子组件，几百条数据就能把首屏卡住。
 *
 * 分页追加用 appendAll()，它只通知新增区间，不会让已渲染的列表项重建。
 */
export class LazyDataSource<T> implements IDataSource {
    private items: T[] = [];
    private listeners: DataChangeListener[] = [];
    totalCount(): number {
        return this.items.length;
    }
    getData(index: number): T {
        return this.items[index];
    }
    getAll(): T[] {
        return this.items;
    }
    registerDataChangeListener(listener: DataChangeListener): void {
        if (this.listeners.indexOf(listener) < 0) {
            this.listeners.push(listener);
        }
    }
    unregisterDataChangeListener(listener: DataChangeListener): void {
        const index: number = this.listeners.indexOf(listener);
        if (index >= 0) {
            this.listeners.splice(index, 1);
        }
    }
    /** 整体替换：刷新、切换筛选条件时用 */
    reset(items: T[]): void {
        this.items = items.slice();
        this.notifyReload();
    }
    /** 分页追加：只通知新增区间，已有列表项不重建 */
    appendAll(items: T[]): void {
        if (items.length === 0) {
            return;
        }
        const start: number = this.items.length;
        this.items = this.items.concat(items);
        for (let i = 0; i < items.length; i++) {
            this.notifyAdd(start + i);
        }
    }
    updateAt(index: number, item: T): void {
        if (index < 0 || index >= this.items.length) {
            return;
        }
        this.items[index] = item;
        this.notifyChange(index);
    }
    removeAt(index: number): void {
        if (index < 0 || index >= this.items.length) {
            return;
        }
        this.items.splice(index, 1);
        this.notifyDelete(index);
    }
    clear(): void {
        this.items = [];
        this.notifyReload();
    }
    isEmpty(): boolean {
        return this.items.length === 0;
    }
    private notifyReload(): void {
        this.listeners.forEach((listener: DataChangeListener) => listener.onDataReloaded());
    }
    private notifyAdd(index: number): void {
        this.listeners.forEach((listener: DataChangeListener) => listener.onDataAdd(index));
    }
    private notifyChange(index: number): void {
        this.listeners.forEach((listener: DataChangeListener) => listener.onDataChange(index));
    }
    private notifyDelete(index: number): void {
        this.listeners.forEach((listener: DataChangeListener) => listener.onDataDelete(index));
    }
}

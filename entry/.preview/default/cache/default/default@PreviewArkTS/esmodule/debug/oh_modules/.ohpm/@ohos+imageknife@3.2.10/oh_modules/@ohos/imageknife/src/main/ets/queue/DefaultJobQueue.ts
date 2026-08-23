import type { ImageKnifeRequest } from '../model/ImageKnifeRequest';
import type { IJobQueue } from './IJobQueue';
import Queue from "@ohos:util.Queue";
import taskpool from "@ohos:taskpool";
export class DefaultJobQueue implements IJobQueue {
    highQueue: Queue<ImageKnifeRequest> = new Queue();
    normalQueue: Queue<ImageKnifeRequest> = new Queue();
    lowQueue: Queue<ImageKnifeRequest> = new Queue();
    getQueueLength(): number {
        return this.highQueue.length + this.normalQueue.length + this.lowQueue.length;
    }
    add(request: ImageKnifeRequest): void {
        if (request.imageKnifeOption.priority === undefined || request.imageKnifeOption.priority === taskpool.Priority.MEDIUM) {
            this.normalQueue.add(request);
        }
        else if (request.imageKnifeOption.priority === taskpool.Priority.HIGH) {
            this.highQueue.add(request);
        }
        else {
            this.lowQueue.add(request);
        }
    }
    pop(): ImageKnifeRequest | undefined {
        if (this.highQueue.length > 0) {
            return this.highQueue.pop();
        }
        else if (this.normalQueue.length > 0) {
            return this.normalQueue.pop();
        }
        else {
            return this.lowQueue.pop();
        }
    }
}

import { SeekMethod } from "./extractor";
export declare class DataFile {
    private buffers;
    private size;
    private pos;
    constructor(data?: Uint8Array);
    read(size: number): Uint8Array | null;
    readAll(): Uint8Array;
    write(data: Uint8Array): boolean;
    tell(): number;
    seek(pos: number, method: SeekMethod): boolean;
    private flatten();
}

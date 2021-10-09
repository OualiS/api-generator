import { Extractor, SeekMethod } from "./extractor";
export declare class FileExtractor extends Extractor {
    protected _filePath: string;
    private _target;
    private fileMap;
    constructor(filepath: string, targetPath: string, password: string);
    protected open(filename: string): number;
    protected create(filename: string): number;
    protected closeFile(fd: number): Uint8Array | null;
    protected read(fd: number, buf: any, size: number): number;
    protected write(fd: number, buf: any, size: number): boolean;
    protected tell(fd: number): number;
    protected seek(fd: number, pos: number, method: SeekMethod): boolean;
}

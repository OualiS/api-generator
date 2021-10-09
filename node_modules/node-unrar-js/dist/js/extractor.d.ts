export declare type SeekMethod = "CUR" | "SET" | "END";
export declare type FailReason = "ERAR_SUCCESS" | "ERAR_END_ARCHIVE" | "ERAR_NO_MEMORY" | "ERAR_BAD_DATA" | "ERAR_BAD_ARCHIVE" | "ERAR_UNKNOWN_FORMAT" | "ERAR_EOPEN" | "ERAR_ECREATE" | "ERAR_ECLOSE" | "ERAR_EREAD" | "ERAR_EWRITE" | "ERAR_SMALL_BUF" | "ERAR_UNKNOWN" | "ERAR_MISSING_PASSWORD" | "ERAR_EREFERENCE" | "ERAR_BAD_PASSWORD";
export declare type State = {
    state: "SUCCESS";
} | {
    state: "FAIL";
    reason: FailReason;
    msg: string | null;
};
export declare type CompressMethod = "Storing" | "Fastest" | "Fast" | "Normal" | "Good" | "Best" | "Unknown";
export interface FileHeader {
    name: string;
    flags: {
        encrypted: boolean;
        solid: boolean;
        directory: boolean;
    };
    packSize: number;
    unpSize: number;
    crc: number;
    time: string;
    unpVer: string;
    method: CompressMethod;
}
export interface ArcHeader {
    comment: string;
    flags: {
        volume: boolean;
        lock: boolean;
        solid: boolean;
        authInfo: boolean;
        recoveryRecord: boolean;
        headerEncrypted: boolean;
    };
}
export interface ArcList {
    arcHeader: ArcHeader;
    fileHeaders: FileHeader[];
}
export declare type Result<T> = [State, T | null];
export interface ArcFile {
    fileHeader: FileHeader;
    extract: Result<Uint8Array>;
}
export interface ArcFiles {
    arcHeader: ArcHeader;
    files: Array<ArcFile | null>;
}
export declare abstract class Extractor {
    private static _current;
    protected abstract _filePath: string;
    private _password;
    private _archive;
    private _lastFileContent;
    constructor(password?: string);
    getFileList(): Result<ArcList>;
    extractAll(): Result<ArcFiles>;
    extractFiles(files: string[], password?: string): Result<ArcFiles>;
    protected fileCreated(filename: string): void;
    protected abstract open(filename: string): number;
    protected abstract create(filename: string): number;
    protected abstract read(fd: number, buf: any, size: number): number;
    protected abstract write(fd: number, buf: any, size: number): boolean;
    protected abstract tell(fd: number): number;
    protected abstract seek(fd: number, pos: number, method: SeekMethod): boolean;
    protected abstract closeFile(fd: number): Uint8Array | null;
    protected close(fd: number): void;
    private openArc(listOnly, password?);
    private processNextFile(callback);
    private closeArc();
    private getFailInfo(errCode, errType);
}

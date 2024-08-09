declare type intensity = { r: number, g: number, b: number };
declare function startScan(
    calibrationTime_inMS?: number,
    minimumScanTime_inMS?: number,
    totalScanTime_inMS?: number
): Promise<void>;
declare function stopScan(noCallback?: boolean): void;
declare namespace fingerScan {
    export { startScan };
    export { stopScan };
    export function onFrame(callback: ({ type, timeElapsed, confidence, fps }: {
        type: "calibration" | "scan";
        timeElapsed: number;
        confidence: number;
        fps: number;
    }) => void): void;
    export function onScanFinish(callback: ({ raw_intensity, ppg_time, average_fps }: {
        raw_intensity: intensity[];
        ppg_time: number[];
        average_fps: number;
    }) => void): void;
    export function onError(callback: (err: Error) => void): void;
    export function isInitializing(): boolean;
    export function isScanning(): boolean;
    export function canStop(): boolean;
    export function isFingerInView(): boolean;
}
export default fingerScan;

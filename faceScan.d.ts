declare type intensity = { r: number, g: number, b: number };
declare function startScan(
    calibrationTime_inMS?: number,
    minimumScanTime_inMS?: number,
    totalScanTime_inMS?: number,
    modelPath?: string,
    lightModeRedetectionInterval_inMS?: number,
    drawProps?: {
        drawType: "face-circle" | "bounding-box" | "corner-box";
        color: string;
    }
): Promise<void>;
declare function stopScan(noCallback?: boolean): void;
declare namespace faceScan {
    export { startScan };
    export { stopScan };
    export function onFrame(callback: ({ type, timeElapsed, isLightMode, fps }: {
        type: "calibration" | "scan";
        timeElapsed: number;
        isLightMode: boolean;
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
    export function isFaceInView(): boolean;
}
export default faceScan;

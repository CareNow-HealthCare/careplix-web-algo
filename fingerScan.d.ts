declare type intensity = { r: number; g: number; b: number };
declare function startScan({
  calibrationTime_inSec,
  scanTime_inSec,
  strict_mode,
  videoElement,
  canvasElement,
}: {
  calibrationTime_inSec?: number;
  scanTime_inSec?: number;
  strict_mode?: boolean;
  videoElement: HTMLVideoElement;
  canvasElement: HTMLCanvasElement;
}): Promise<void>;
declare function stopScan(noCallback?: boolean): void;
declare namespace fingerScan {
  export { startScan };
  export { stopScan };
  export function onFrame(
    callback: ({
      type,
      timeElapsed,
      percentage,
      isFingerInView,
    }: {
      type: "calibration" | "scan";
      timeElapsed: number;
      percentage: number;
      isFingerInView: boolean;
    }) => void
  ): void;
  export function onScanFinish(
    callback: ({
      raw_intensity,
      ppg_time,
      average_fps,
    }: {
      raw_intensity: intensity[];
      ppg_time: number[];
      average_fps: number;
    }) => void
  ): void;
  export function onError(callback: (err: Error) => void): void;
  export function isInitializing(): boolean;
  export function isScanning(): boolean;
}
export default fingerScan;

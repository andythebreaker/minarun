/**
 *
 * useAudio hook
 * ----
 * Optimized and Supercharged React hook to play audio without any DOM element 💪🎧
 * Created with love by Mohak Srivastav
 *
 */
interface optionsType {
    src: string | string[];
    loop?: boolean;
    volume?: number;
    muted?: boolean;
    onLoadedData?: (e: Event) => void;
    onError?: (e: Event) => void;
    onEnded?: (e: Event) => void;
}
/**
 * useAudio hook to play and control the audio
 *
 * @param {*} options
 */
export declare const useAudio: (options: optionsType) => {
    isPlaying: boolean;
    play: () => void;
    pause: () => void;
    toggle: () => void;
};
export {};

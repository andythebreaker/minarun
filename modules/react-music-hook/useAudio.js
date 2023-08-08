"use strict";
/**
 *
 * useAudio hook
 * ----
 * Optimized and Supercharged React hook to play audio without any DOM element 💪🎧
 * Created with love by Mohak Srivastav
 *
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.useAudio = void 0;
const react_1 = require("react");
/**
 * useAudio hook to play and control the audio
 *
 * @param {*} options
 */
const useAudio = (options) => {
    let idx = 0;
    //const audio = useMemo(() => new Audio(options.src), [options.src]);
    const audio = (0, react_1.useMemo)(() => {
        let src = options.src;
        if (Array.isArray(src)) {
            src = src[idx];
            console.log('debug[ary]');
        }
        return new Audio(src);
    }, [options.src]);
    // Managing the playing state
    const [isPlaying, setIsplaying] = (0, react_1.useState)(false);
    // play function to play the audio
    const play = () => {
        audio
            .play()
            .then(() => setIsplaying(true))
            .catch((error) => {
            var _a;
            setIsplaying(false);
            console.log(error);
            (_a = options.onError) === null || _a === void 0 ? void 0 : _a.call(options, error);
        });
    };
    // pause the audio
    const pause = () => {
        setIsplaying(false);
        audio.pause();
    };
    // Function to change the audio source
    const changeAudioSource = (newSrc) => {
        audio.pause();
        audio.currentTime = 0;
        audio.src = newSrc;
        audio.load();
        audio.play();
    };
    // Toggle between play and pause
    const toggle = () => (isPlaying ? pause() : play());
    (0, react_1.useEffect)(() => {
        // Loop the audio if loop is true, default is false
        audio.loop = options.loop || false;
        // Adjust the volume of the audio, default is 1(max)
        audio.volume = options.volume || 1;
        // Mute the audio if muted is true, default is false
        audio.muted = options.muted || false;
        // Execute the onLoadedData function after finishing the loading of audio
        audio.onloadeddata = (e) => { var _a; return (_a = options.onLoadedData) === null || _a === void 0 ? void 0 : _a.call(options, e); };
        audio.onended = (e) => { 
            console.log("on end???");
            var _a; return (_a = options.onEnded) === null || _a === void 0 ? void 0 : _a.call(options, e); };
        // Execute after the ending of the audio
        audio.addEventListener('ended', (e) => {
            console.log("on end");
            var _a;
            // Execute the onEnded function
            (_a = options.onEnded) === null || _a === void 0 ? void 0 : _a.call(options, e);
            console.log(options.src.length);
            idx = idx + 1 >= options.src.length ? 0 : idx + 1;
            // Play again the audio after the end if loop is true
            options.loop
                ? Array.isArray(options.src)
                    ? changeAudioSource(options.src[idx])
                    : audio.play()
                : setIsplaying(false);
        });
        // Cleanup
        return () => {
            //-(?)audio.pause();
            //-(?)audio.currentTime = 0;
            !options.loop &&
                audio.removeEventListener('ended', () => setIsplaying(false));
        };
    }, [audio, options]);
    // Returning isPlaying, play, pause, toogle
    return { isPlaying, play, pause, toggle };
};
exports.useAudio = useAudio;

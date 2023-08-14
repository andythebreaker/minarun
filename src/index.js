//TODO ts init

/**setting */
const mute = false;//TODO move
const donothing_print_console_log = false;
const PRINT_findMp3FilesInDirectory = true;
const speech_index_ts = './src/speech/index.ts';
const PRINT_ansjson_h512_digest_hex_undefined_target_speech_ts_read = true;
const PRINT_this_word_hit_target_speech_ts_read = true;
const PRINT_mp3_str_TScache_no_hit_body_data_text = true;
const PRINT_mp3_str_TScache_no_hit_mp3listM = true;
const PRINT_devtime_P_ts_file_read_and_find_howhow_match1=true;
const PRINT_devtime_P_ts_file_read_and_find_howhow_No_matches_found=true;
const PRINT_main_have_PP=true;

/**import */
const util = require('util');
const exec = util.promisify(require('child_process').exec);
const fs = require('fs').promises;
const { Hash, createHash } = require('crypto');
const path = require('path');
const log = require('log-utils');
var consoleControl = require('console-control-strings');
const fetch = require('make-fetch-happen').defaults({
    cachePath: './my-cache'
});//TODO cachePath

/**全域:preval路徑陣列 */
const have_Provider = [];

function donothing(log_trace) {
    if (donothing_print_console_log) console.log(consoleControl.color('blue', 'bgRed', 'bold') + "donothing: " + String(log_trace) + consoleControl.color('reset'));
}

async function findMp3FilesInDirectory(directory, bar) {/**輸入:mp3資料夾(含1、2)；目標音(大陸拼音, 英文呈現) */
    var lstLOCAL;
    try {
        const files = await fs.readdir(directory);
        /**造訪mp3目錄 */
        for (const file of files) {
            const filePath = path.join(directory, file);
            const stats = await fs.stat(filePath);
            if (stats.isDirectory()) {//!important!jump
                /**遞迴 */
                lstLOCAL = await findMp3FilesInDirectory(filePath, bar); // Recursively search subdirectories
                if (lstLOCAL !== undefined) {
                    /**提早退場 */
                    return new Promise((resolve) => {
                        resolve(lstLOCAL);
                    });
                } else {
                    donothing('[findMp3FilesInDirectory] 提早退場');
                }
            } else if (path.extname(file) === '.mp3') {
                if (path.parse(file).name === bar) {
                    /**是否是所需音軌 */
                    if (PRINT_findMp3FilesInDirectory) console.log(log.ok(`   mp3found ${filePath}`));
                    lstLOCAL = filePath;
                }
            } else {
                donothing('[findMp3FilesInDirectory]');
            }
        }
        return new Promise((resolve) => {//TODO 缺音不報錯吧?
            resolve(lstLOCAL);
        });
    } catch (err) {
        console.error('[findMp3FilesInDirectory] Error:', err);
    }
}

async function preval_finder(fp) {/**輸入單一檔案路徑 */
    /**工作函式:找是否preval並建(路徑)陣列 */
    const searchString_regex = "import *{? *preval *}? *from *['|\"]babel-plugin-preval/macro['|\"] *;";
    var regex;
    try {
        regex = new RegExp(searchString_regex);
    } catch (error) {
        /**錯誤訊息 */
        console.error('[preval_finder] Error creating regex:', error.message);
    }
    const searchString = regex;
    try {
        const content = await fs.readFile(fp, 'utf-8');
        if (searchString.test(content)) {
            have_Provider.push(fp);
        }
    } catch (err) {
        /**錯誤訊息 */
        console.error('[preval_finder] Error reading the file:', err);
    }
}

async function traverseDir(currentPath) {/**輸入'./src或主ts群資料夾' */
    /**遍歷src尋找ts並執行工作(工作函式:很長名子) */
    const files = await fs.readdir(currentPath);
    for (const file of files) {
        const filePath = path.join(currentPath, file);
        const stats = await fs.stat(filePath);

        if (stats.isDirectory()) {
            await traverseDir(filePath);
        } else if (stats.isFile() && (file.endsWith('.ts') || file.endsWith('.tsx'))) {
            //!important!jump
            await preval_finder(filePath);
        } else {
            donothing('[traverseDir] dont go into else');
        }
    }
}

async function bash_ffmpeg() {//TODO input args
    try {
        const { stdout, stderr } = await exec('ffmpeg -y -f concat -i tmp_ffmpeg_mix.txt -c copy output.mp3');

        console.log(stdout, stderr);

        console.log("finish");

        //mp3 to hex

        //hex to ts

        //rm tmp

    } catch (error) {
        console.error('[bash_ffmpeg] ', error.message);
    }
}

async function target_speech_ts_read(mp3_str_text_x1) {
    /**speech index.ts 中 JSON mp3 快取 是否已建立*/
    try {
        const speech_main_ts = await fs.readFile(speech_index_ts, 'utf8');
        /**找尋speech ts目標中的json */
        const jsonbot_finder = /const *bot *: *Bot *= *{([^}]+)} *;/gm;
        const SOLjsonbot_finder = [...speech_main_ts.matchAll(jsonbot_finder)];
        if (SOLjsonbot_finder.length !== 1) { console.error("[SOLjsonbot_finder] matches error => NEQ1"); } else {
            /**json正則化(需改進) */
            const regex_replace = /([^, \n:]+) *:/gm;
            const subst = '"$1":';
            const replace_result = (SOLjsonbot_finder[0][1]).replace(regex_replace, subst);
            var ansjson = JSON.parse('{' + replace_result + '}');//TODO globl
            const h512 = createHash("sha512");
            h512.update(mp3_str_text_x1, 'utf8');
            if (ansjson[h512.digest('hex')] === undefined) {
                /**mp3字串資料尚未建立 */
                if (PRINT_ansjson_h512_digest_hex_undefined_target_speech_ts_read) console.log(log.ok(`   ansjson[h512.digest('hex')]===undefined`));
                //!important!jump
                await mp3_str_TScache_no_hit(mp3_str_text_x1);
            } else {
                /**mp3字串資料已建立 */
                if (PRINT_this_word_hit_target_speech_ts_read) console.log(log.ok(`   this word hit`));//**exit*/
            }
        }
    } catch (error_for_file_cant_read) { console.log('[target_speech_ts_read] ', error_for_file_cant_read); }
}

async function mp3_str_TScache_no_hit(mp3_str_text_x1) {
    const res = await fetch('https://api.zhconvert.org/convert?converter=Pinyin&text=' + mp3_str_text_x1 + '&prettify=1');
    const body = await res.json();
    if (PRINT_mp3_str_TScache_no_hit_body_data_text) console.log(log.ok(`   ${body.data.text}`));
    const wordsArray = body.data.text.split(' ');
    var mp3listM = '#\n';
    for (let i = 0; i < wordsArray.length; i++) {
        if (!mute) console.log(wordsArray[i]);
        //!important!jump
        const glob_keep_pth = await findMp3FilesInDirectory("./local-dev/mp3", wordsArray[i]);
        mp3listM += ("file '" + (glob_keep_pth.replace(/\\/g, '/')) + "'\n");
    }
    if (PRINT_mp3_str_TScache_no_hit_mp3listM) console.log(log.ok(`   ${mp3listM}`));
    await fs.writeFile('tmp_ffmpeg_mix.txt', mp3listM);
    //!important!jump
    await bash_ffmpeg();
}

async function devtime_P_ts_file_read_and_find_howhow(fp) {/**ts單檔路徑 */
/**在src ts中找howhow(字串)並執行 */
    const regexPattern = /howhow\( *"([^()]+)" *\)/gm;//TODO 正則表達式缺陷
    try {
        const data = await fs.readFile(fp, 'utf8');
        const matches = [...data.matchAll(regexPattern)];
        if (matches.length > 0) {
            if (!mute) console.log("Matches in file");
            for (let j = 0; j < matches.length; j++) {
                /**取得繁體中文字串 */
                const match = matches[j];
                if (PRINT_devtime_P_ts_file_read_and_find_howhow_match1) console.log(log.ok(`${match[1]}`));
                //!important!jump
                await target_speech_ts_read(match[1]);
            }
        } else {
            if (PRINT_devtime_P_ts_file_read_and_find_howhow_No_matches_found) console.log(log.ok(`No matches found`));
        }
    } catch (err) {
        console.error('[devtime_P_ts_file_read_and_find_howhow] Error reading file:', err);
    }
}

async function main(dirPath) {
    /**主工作階段 */
    have_Provider=[];
    /**輔助函式:找尋適當ts */
    //!important!jump
    await traverseDir(dirPath);
    if (PRINT_main_have_PP) console.log(log.ok(`${have_Provider}`));
    for (let i = 0; i < have_Provider.length; i++) {
        const filePath = have_Provider[i];
        const fullPath = path.resolve(filePath);
        //!important!jump
        await devtime_P_ts_file_read_and_find_howhow(fullPath);
    }
    return have_Provider;
}

module.exports = main;

//TODO setting
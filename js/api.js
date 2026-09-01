const BASE='https://api.alquran.cloud/v1';
async function getJson(url){const r=await fetch(url);if(!r.ok)throw new Error(`API ${r.status}`);return r.json()}
export async function getSurahs(){return (await getJson(`${BASE}/surah`)).data}
export async function getSurahText(surah){return (await getJson(`${BASE}/surah/${surah}/quran-uthmani`)).data}
export async function getSurahTranslation(surah,edition){return (await getJson(`${BASE}/surah/${surah}/${encodeURIComponent(edition)}`)).data}
export async function getSurahAudio(surah,edition){return (await getJson(`${BASE}/surah/${surah}/${encodeURIComponent(edition)}`)).data}
export async function getTranslations(){return (await getJson(`${BASE}/edition/type/translation?format=text`)).data.filter(x=>x.format==='text'&&x.type==='translation')}
export async function getReciters(){return (await getJson(`${BASE}/edition/format/audio`)).data.filter(x=>x.format==='audio'&&x.type==='versebyverse')}

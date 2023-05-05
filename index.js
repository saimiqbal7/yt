const puppeteer = require('puppeteer');
const cheerio = require('cheerio');
const axios = require('axios');
const fs = require('fs');

async function downloadYouTubeVideo(videoId) {
  const url = `https://www.youtube.com/watch?v=k1TECkBQGdo`;
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto(url);

  const htmlContent = await page.content();
  const $ = cheerio.load(htmlContent);


  const videoUrl = $('meta[property="og:video"]').attr('content');


  const videoData = await axios.get(videoUrl, { responseType: 'arraybuffer' });
  fs.writeFile('video.mp4', videoData.data, () => console.log('Video downloaded successfully!'));

  await browser.close();
}

downloadYouTubeVideo('k1TECkBQGdo'); 

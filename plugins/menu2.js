let fs = require ('fs')
let path = require('path')
let { MessageType } = require('@adiwajshing/baileys')
let handler  = async (m, { conn, usedPrefix: _p, DevMode }) => {
  try {
    let package = JSON.parse(fs.readFileSync(path.join(__dirname, '../package.json')))
    let name = conn.getName(m.sender)
    let d = new Date
    let locale = 'id'
    let gmt = new Date(0).getTime() - new Date('1 January 1970').getTime()
    let weton = ['Pahing', 'Pon','Wage','Kliwon','Legi'][Math.floor(((d * 1) + gmt) / 84600000) % 5]
    let week = d.toLocaleDateString(locale, { weekday: 'long' })
    let date = d.toLocaleDateString(locale, {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    })
    let time = d.toLocaleTimeString(locale, {
      hour: 'numeric',
      minute: 'numeric',
      second: 'numeric'
    })
    let _uptime = process.uptime() * 1000
    let _muptime
    if (process.send) {
      process.send('uptime')
      _muptime = await new Promise(resolve => {
        process.once('message', resolve)
        setTimeout(resolve, 1000)
      }) * 1000
    }
    let muptime = clockString(_muptime)
    let uptime = clockString(_uptime)
    let totalreg = Object.keys(global.db.data.users).length
    let tags = {
     'main': '𝗨𝘁𝗮𝗺𝗮',
    'game': '𝗚𝗮𝗺𝗲',
    'jadian': '𝗝𝗮𝗱𝗶𝗮𝗻',
    'xp': '𝗘𝘅𝗽 & 𝗟𝗶𝗺𝗶𝘁',
    'sticker': '𝗦𝘁𝗶𝗸𝗲𝗿',
    'kerang': '𝗞𝗲𝗿𝗮𝗻𝗴 𝗔𝗷𝗮𝗶𝗯',
    'quotes': '𝗤𝘂𝗼𝘁𝗲𝘀',                                                                     'ph': '𝗣𝗵𝗼𝘁𝗼𝗼𝘅𝘆',
    'ep': '𝗘𝗽𝗵𝗼𝘁𝗼',
    'editor': '𝗘𝗱𝗶𝘁𝗼𝗿',
    'maker': '𝗠𝗮𝗸𝗲𝗿',
    'te': '𝗧𝗲𝘅𝘁 𝗣𝗿𝗼 𝗠𝗲',
    'admin': `𝗔𝗱𝗺𝗶𝗻 ${global.opts['restrict'] ? '' : '(Dinonaktifkan)'}`,
    'group': '𝗚𝗿𝘂𝗽',
    'premium': '𝗣𝗿𝗲𝗺𝗶𝘂𝗺',
    'internet': '𝗜𝗻𝘁𝗲𝗿𝗻𝗲𝘁',
    'anonymous': '𝗔𝗻𝗼𝗻𝘆𝗺𝗼𝘂𝘀 𝗖𝗵𝗮𝘁',
    'nulis': '𝗠𝗮𝗴𝗲𝗿 𝗡𝘂𝗹𝗶𝘀 & 𝗟𝗼𝗴𝗼',
    'downloader': '𝗗𝗼𝘄𝗻𝗹𝗼𝗮𝗱𝗲𝗿',
    'tools': '𝗧𝗼𝗼𝗹𝘀',
    'fun': '𝗙𝘂𝗻',
    'database': '𝗗𝗮𝘁𝗮𝗯𝗮𝘀𝗲',
    'about': '𝗔𝗯𝗼𝘂𝘁',
    'vote': '𝗩𝗼𝘁𝗶𝗻𝗴',
    'absen': '𝗔𝗯𝘀𝗲𝗻',
    'quran': '𝗔𝗹 𝗤𝘂𝗿\'𝗮𝗻',
    'audio': '𝗔𝘂𝗱𝗶𝗼',
    'jadibot': '𝗝𝗮𝗱𝗶 𝗕𝗼𝘁',
    'info': '𝗜𝗻𝗳𝗼',
    '': '𝗧𝗮𝗻𝗽𝗮 𝗞𝗮𝘁𝗲𝗴𝗼𝗿𝗶',
    }
    for (let plugin of Object.values(global.plugins))
      if (plugin && 'tags' in plugin)
        for (let tag of plugin.tags)
          if (!tag in  tags) tags[tag] = tag
    let help = Object.values(global.plugins).map(plugin => {
      return {
        help: plugin.help,
        tags: plugin.tags,
        prefix: 'customPrefix' in plugin,
        limit: plugin.limit
      }
    })
    let groups = {}
    for (let tag in tags) {
      groups[tag] = []
      for (let menu of help)
        if (menu.tags && menu.tags.includes(tag))
          if (menu.help) groups[tag].push(menu)
    }
    conn.menu = conn.menu ? conn.menu : {}
    let before = conn.menu.before || `┌──「 ${conn.user.name} 」
├============================
├  ${ucapan()}, %name!
├ Nama : %name!
├ Hari: *%week %weton*
├ Tanggal: *%date*
├ Waktu: *%time*
├ Uptime: *%uptime ( %muptime )*
╰============================`
    let header = conn.menu.header || `⁙╭━━•›ꪶ ⸙ ━ ━ ━ ━ ꪶ ⸙‹•━━╮
⁙┃╭┈─────────────⩵࿐ཱི
⁙┃╰─── %category ───➤ ↶↷* 
⁙├☆─〔 〲<DevicBT> 〕 ──➤`
    let body   = conn.menu.body   || '⁙├〲 %cmd%islimit'
    let footer = conn.menu.footer || '⁙╰•☆°°°🕊°°°🕊°°°🕊°°°‹•━━╮'
    let after  = conn.menu.after  || '\n'
    let _text  = before + '\n'
    for (let tag in groups) {
      _text += header.replace(/%category/g, tags[tag]) + '\n'
      for (let menu of groups[tag]) {
        for (let help of menu.help)
          _text += body.replace(/%cmd/g, menu.prefix ? help : '%p' + help).replace(/%islimit/g, menu.limit ? ' (Limit)' : '')  + '\n'
      }
      _text += footer + '\n'
    }
    _text += after
    text =  typeof conn.menu == 'string' ? conn.menu : typeof conn.menu == 'object' ? _text : ''
    let replace = {
      '%': '%',
      p: _p, uptime, muptime,
      npmname: package.name,
      npmdesc: package.description,
      version: package.version,
      github: package.homepage ? package.homepage.url || package.homepage : '[unknown github url]',
      name, weton, week, date, time,
      readmore: readMore
    }
    text = text.replace(new RegExp(`%(${Object.keys(replace).join`|`})`, 'g'), (_, name) => replace[name])
    //conn.reply(m.chat, text.trim(), m)
    //await conn.send2Button(m.chat, text.trim(), 'PEMILIK BOT BY ❤️ BENNIISMAEL', 'OWNER', '#owner', 'DONASI', '#donasi', m)
    let nama = await conn.getName(m.sender)

let fkon = { key: { fromMe: false, participant: `0@s.whatsapp.net`, ...(m.chat ? { remoteJid: '16504228206@s.whatsapp.net' } : {}) }, message: { contactMessage: { displayName: `${nama}`, vcard: `BEGIN:VCARD\nVERSION:3.0\nN:;a,;;;\nFN:${name}\nitem1.TEL;waid=${m.sender.split('@')[0]}:${m.sender.split('@')[0]}\nitem1.X-ABLabel:Ponsel\nEND:VCARD`}}}

  sumberImg = fs.readFileSync(`./src/logo.jpg`)
  image = (await conn.prepareMessage('6285756507257@s.whatsapp.net', sumberImg, MessageType.image, { thumbnail: Buffer.alloc(0) })).message.imageMessage
  res = await conn.prepareMessageFromContent(m.chat, {
    "productMessage": {
      "product": {
        "productImage": image,
        "productId": "4938174216214248",
        "title": `${ucapan()}, ${conn.getName(m.sender)} !`,
        "description": '〲<Recode By><Adryan>\n\n' + text,
        "retailerId":  `${week} ${date}\n\nTime: ${time} Wib`,
        "url": 'github.com/LasDrak',
        "descriptionCount": "999999999",
        "productImageCount": "1",
      },
      "businessOwnerJid": "6285756507257@s.whatsapp.net",
      "contextInfo": {
        "forwardingScore": 9999,
        "isForwarded": true
      }
    }
  },
    { quoted: fkon })
  conn.relayWAMessage(res)
  } catch (e) {
    conn.reply(m.chat, 'Maaf, command sedang error', m)
    throw e
  }
}
handler.help = ['menu2']
handler.tags = ['info']
handler.command = /^(menu2|menu|command)$/i
module.exports = handler

const more = String.fromCharCode(8206)
const readMore = more.repeat(4001)

function clockString(ms) {
  let h = isNaN(ms) ? '--' : Math.floor(ms / 3600000)
  let m = isNaN(ms) ? '--' : Math.floor(ms / 60000) % 60
  let s = isNaN(ms) ? '--' : Math.floor(ms / 1000) % 60
  return [h, m, s].map(v => v.toString().padStart(2, 0)).join(':')
}
function ucapan() {
  const time = (new Date().getUTCHours() + 7) % 24
  res = "Woi. Pagi"
  if (time >= 4) {
    res = "Selamat Pagi"
  }
  if (time >= 12) {
    res = "Selamat Siang"
  }
  if (time >= 15) {
    res = "Selamat Sore"
  }
  if (time >= 19) {
    res = "Selamat Malam"
  }
  return res
}

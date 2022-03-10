let fetch = require('node-fetch')
let handler = m => m
let levelling = require('../lib/levelling')
let fs = require('fs')
handler.before = m => {
    let user = global.db.data.users[m.sender]
    if (!user.autolevelup) return
    if (m.sender === global.conn.user.jid) return
    let before = user.level * 1
    while (levelling.canLevelUp(user.level, user.role, user.exp, global.multiplier)) user.level++
    if (before !== user.level) {
        let str = `Selamat @${m.sender.split`@`[0]} Anda Naik 🧬 level 
*${before}* --> *${user.level}*
*Role: ${user.role}*
`.trim()
         conn.sendButton(m.chat, str, wm, `Profil`, `.profile`, m, false, {
    contextInfo: {
      mentionedJid: [m.sender]
    }
  })
    }
    return true
}
 
module.exports = handler

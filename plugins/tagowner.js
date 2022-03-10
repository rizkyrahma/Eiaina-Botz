let handler = async (m, { conn, text }) => {
    let name = m.fromMe ? conn.user : conn.contacts[m.sender]
conn.reply(global.owner[0] + `@s.whatsapp.net`, ` *@6285756507257 Ada yang memanggil anda :V*`, m)

  conn.reply(m.chat, `
Kak (@6285756507257  ), Ada Yang Manggil anda😊
`.trim(), m)
    let mentionedJid = [m.sender]
}
handler.customPrefix = /@6285756507257 /i
handler.command = new RegExp

module.exports = handler
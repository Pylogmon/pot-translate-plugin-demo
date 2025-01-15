// main.js
async function translate(text, from, to, options) {
    const { config, utils } = options;
    const { tauriFetch: fetch } = utils;
    let { requestPath: url } = config;

    // 设置默认URL
    if (!url || url.trim().length === 0) {
        url = "https://trtrc.net/Mirai.php";
    }

    // 确保URL格式正确
    if (!url.startsWith("http")) {
        url = `https://${url}`;
    }

    // 准备请求数据
    const requestData = {
        source_lang: from,
        target_lang: to,
        text: text
    };

    try {
        const res = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(requestData)
        });

        if (res.ok) {
            const result = res.data;
            if (result && result.translated_text) {
                return result.translated_text;
            } else {
                throw new Error('Translation result is empty');
            }
        } else {
            throw new Error(`HTTP Error: ${res.status}`);
        }
    } catch (error) {
        console.error('Translation error:', error);
        throw error;
    }
}

// 导出翻译函数
module.exports = {
    translate
};

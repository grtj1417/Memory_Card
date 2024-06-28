// eslint-disable-next-line react-refresh/only-export-components
var DISPLAY_ARRAY_SIZE = 3;
/*
*   @ params
*   @diff = integer 1 ~ 3
*/
export function setDifficultyAndCreateDeck(diff) {
    var total_card_array_size = 56;
    var deck = [];
    switch (diff) {
        case 1:
            DISPLAY_ARRAY_SIZE = 3;
            total_card_array_size = 5;
            break;
        case 2:
            DISPLAY_ARRAY_SIZE = 5;
            total_card_array_size = 25;
            break;
        case 3:
            DISPLAY_ARRAY_SIZE = 6;
            total_card_array_size = 56;
            break;
        default:
            DISPLAY_ARRAY_SIZE = 3;
    }

    for (let x = 2; x < 58; x++) {
        deck.push(x);
    }
    for (var i = deck.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = deck[i];
        deck[i] = deck[j];
        deck[j] = temp;
    }
    return deck.splice(0, total_card_array_size);
}

export function selectCard(currSelect, cardArray, selectedCardArray) {
    //push進selectedCardArray
    selectedCardArray.push(currSelect);

    //找出selected index 並在cardArray刪除
    const currSelectIndex = cardArray.indexOf(currSelect);
    cardArray.splice(currSelectIndex, 1);

    return [cardArray, selectedCardArray]
}

export function shuffle(cardArray, selectedCardArray) {
    var shuffleResult = [];
    var currentSize = DISPLAY_ARRAY_SIZE;
    // 決定 兩個 array 的狀態
    // 用意：確認 cardArray 至少有一張  至少有 DISPLAY_ARRAY_SIZE - 1張
    var totalFalseCard = 0;

    //假如cardArray小於display張數 拿取selectedCardArray補齊display張數
    if (cardArray.length < currentSize) {
        totalFalseCard = currentSize - cardArray.length;
    } else if (selectedCardArray.length < currentSize) {
        totalFalseCard = Math.floor(Math.random() * selectedCardArray.length);
    } else {
        totalFalseCard = Math.floor(Math.random() * currentSize);
    }

    // 挑選 totalFalseCard 個元素
    let _arr = [...selectedCardArray];
    for (let i = 0; i < totalFalseCard; i++) {
        if (_arr.length === 0) break;
        let randomIndex = Math.floor(Math.random() * _arr.length);
        shuffleResult.push(_arr.splice(randomIndex, 1)[0]);
    }
    // 挑選 DISPLAY_ARRAY_SIZE - totalFalseCard 個元素
    _arr = [...cardArray];
    for (let i = 0; i < currentSize - totalFalseCard; i++) {
        if (_arr.length === 0) break;
        let randomIndex = Math.floor(Math.random() * _arr.length);
        shuffleResult.push(_arr.splice(randomIndex, 1)[0]);
    }
    // 最後重新洗牌
    for (var i = shuffleResult.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = shuffleResult[i];
        shuffleResult[i] = shuffleResult[j];
        shuffleResult[j] = temp;
    }
    return shuffleResult;
}
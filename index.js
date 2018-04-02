'use strict';
var Alexa = require('alexa-sdk');

//=========================================================================================================================================
//TODO: このコメント行より下の項目に注目してください。
//=========================================================================================================================================

//Replace with your app ID (OPTIONAL).  You can find this value at the top of your skill's page on http://developer.amazon.com.  
//Make sure to enclose your value in quotes, like this: var APP_ID = "amzn1.ask.skill.bb4045e6-b3e8-4133-b650-72923c5980f1";
var APP_ID = "amzn1.ask.skill.685c41d3-33f5-45b5-91e4-bfc5640b143e";

var SKILL_NAME = "鯉の野球豆知識";
var GET_FACT_MESSAGE = "知ってましたか？";
var HELP_MESSAGE = "豆知識を聞きたい時は「鯉の野球豆知識」と、終わりたい時は「おしまい」と言ってください。どうしますか？";
var HELP_REPROMPT = "どうしますか？";
var STOP_MESSAGE = "さようなら";

//=========================================================================================================================================
//「TODO: ここから下のデータを自分用にカスタマイズしてください。」
//=========================================================================================================================================
var data = [
    "勝利の方程式は今村投手、ジャクソン投手、中崎投手です。",
    "タナキクマルは田中選手、菊池選手、丸選手のことです。",
    "神ってるは6月17日,18日のオリックス戦で２試合連続の決勝弾を放ち、緒方監督が、鈴木選手をたたえたことから生まれた言葉です。",
    "石原選手のポテンヒットを「インチキ」といいます。",
    "カピパラ三兄弟は今村投手、一岡投手、大瀬良投手のことです。",
    "中崎投手のツーシームは「ブーシーム」ともいいます。",
    "緒方監督が野間選手を積極的に起用する姿勢のことを「隙あらば野間」といいます。",
    "松山選手のヒーローインタビューの決まり文句は「鹿児島のじいちゃんばあちゃん、俺やったよ！」です。",
    "岩本選手はガンちゃんの愛称から、ホームランを打つとガンキャノン炸裂！と言われます。",
    "ジェット風船を始めたのは鯉の野球が最初なんですよ。",
    "エルドレッド選手は日本語が聞き取れるそうですよ。でも広島弁はまだわからないそうです。",
    "背番号「1」は準永久欠番となっていて、次の着用者を選定する時は引退した前田選手に決定権があるそうですよ。"
];

//=========================================================================================================================================
//この行から下のコードに変更を加えると、スキルが動作しなくなるかもしれません。わかる人のみ変更を加えてください。  
//=========================================================================================================================================
exports.handler = function(event, context, callback) {
    var alexa = Alexa.handler(event, context);
    alexa.APP_ID = APP_ID;
    alexa.registerHandlers(handlers);
    alexa.execute();
};

var handlers = {
    'LaunchRequest': function () {
        this.emit('GetNewFactIntent');
    },
    'GetNewFactIntent': function () {
        var factArr = data;
        var factIndex = Math.floor(Math.random() * factArr.length);
        var randomFact = factArr[factIndex];
        var speechOutput = GET_FACT_MESSAGE + randomFact;
        this.emit(':tellWithCard', speechOutput, SKILL_NAME, randomFact)
    },
    'AMAZON.HelpIntent': function () {
        var speechOutput = HELP_MESSAGE;
        var reprompt = HELP_REPROMPT;
        this.emit(':ask', speechOutput, reprompt);
    },
    'AMAZON.CancelIntent': function () {
        this.emit(':tell', STOP_MESSAGE);
    },
    'AMAZON.StopIntent': function () {
        this.emit(':tell', STOP_MESSAGE);
    },
    'SessionEndedRequest': function () {
        // 処理は書かなくてもOKらしいが、書いておく。
        this.emit(':tell', STOP_MESSAGE);
    },
    // 予期せぬ発話
    'Unhandled': function () {
        // スピーチアウトプットの設定（Alexa応答設定）
        var speechOutput = HELP_MESSAGE;

        // リプロンプトの設定（聞き直し設定）
        var reprompt = HELP_REPROMPT;

        // ask（Alexa応答＋たずねる）
        this.emit(':ask', speechOutput, reprompt);
    }
};

// テスト用ボタン（画面移動させてtest.htmlのページへ移動）
$("#btn").on("click", function () {
    console.log("画面移動ボタン押下")
    location.href = "./test.html";
})

// 現在位置取得してマップ上に表示するボタン
$("#btn_now").on("click", async function () {
  console.log("現在地取得ボタン押下")
  
      // Google Maps API がロードされたことを確認する
    if (!google.maps) {
        console.error("Google Maps APIがロードされていません。");
        return;
    }
  
   // マップの初期化
    const map = new google.maps.Map(document.getElementById("map"), {
        center: { lat: 35.6895, lng: 139.6917 }, // 東京
        zoom: 15,
    });
  
    // 現在位置を取得する関数（getCurrentPosition()）の定義
    async function getCurrentPosition() {
    return new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(
            resolve,
            reject,
            {
                enableHighAccuracy: true,
                timeout: 10000,
                maximumAge: 0, // キャッシュを無効化
            }
        );
    });
    }
    // 現在位置を取得し、マップにピンを表示させる
    try {
        const position = await getCurrentPosition();
        console.log("現在位置の取得position:", position)
        
        const userPosition = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        };
        console.log("現在位置:", userPosition);


        
        // 取得した現在位置に対してピンを指す
        new google.maps.Marker({
            map: map,
            position: userPosition,
            title: "現在位置",
        });
        console.log("マップにピンを打つ")
        // 取得した現在位置をマップのセンターにして表示
        map.setCenter(userPosition);
        map.setZoom(15);
        // エラー処理
      } catch (error) {
        console.error("位置情報の取得に失敗しました:", error);
        showError(map.getCenter(), map);
        }
})

// ｊｓファイル上に記載した位置情報をマップに表示させるボタン
$("#btn_select").on("click", function () {
    console.log("セレクトボタン押下")
       // マップの初期化
    const map = new google.maps.Map(document.getElementById("map"), {
        center: { lat: 35.6895, lng: 139.6917 }, // 東京
        zoom: 15,
    });
   // 現在位置を取得し、マップにピンを表示させる 35.6693494336702, 139.70300075214797
    try {
        const position = {
            lat: 35.6693494336702,
            lng:139.70300075214797,
        }
        console.log("ジーズアカデミーの位置情報の取得")
        const userPosition = {
            lat: position.lat,
            lng: position.lng,
        };
        // 取得した位置に対してピンを指す
        map.setZoom(18);
        new google.maps.Marker({
            map: map,
            position: userPosition,
            title: "ジーズアカデミー東京",
        });
        console.log("マップにピンを打つ")
        // 取得した現在位置をマップのセンターにして表示
        map.setCenter(userPosition);
        // エラー処理
      } catch (error) {
        console.error("位置情報の取得に失敗しました:", error);
        showError(map.getCenter(), map);
        }
})

  
// スプレッドシートとの連携
const API_KEY = 'MYKEY'; // 作成したAPIキーを入力
const SPREADSHEET_ID = 'ID'; // スプレッドシートIDを入力
const RANGE = 'シート1!A1:C2'; // 範囲を指定

// スプレッドシート上の情報取得ボタン
$("#btn_list").on("click", async function () {
    console.log("リストボタン押下")
    // マップの初期化
    const map = new google.maps.Map(document.getElementById("map"), {
        center: { lat: 35.6895, lng: 139.6917 }, // 都庁
        zoom: 15,
    });
    // スプシ上の欲しい情報を取得する関数の定義
        // スプシ上の欲しい情報を取得する関数の実行
    fetchSheetData();
    console.log("fetchSheetData()",fetchSheetData())
    async function fetchSheetData() {
    const url = `https://sheets.googleapis.com/v4/spreadsheets/${SPREADSHEET_ID}/values/${RANGE}?key=${API_KEY}`;
    try {
        const response = await fetch(url);
        console.log("url",url)
        const data = await response.json();
        console.log("tryしてる。data", data)
        console.log("data[1][1]", data.values[1][1])
        console.log("data[1][2]", data.values[1][2])
         // 緯度・経度を文字列から数値型に変換
            const lat = parseFloat(data.values[1][1]);
            const lng = parseFloat(data.values[1][2]);

            if (isNaN(lat) || isNaN(lng)) {
                throw new Error("緯度または経度が無効です");
            }

            console.log(`取得した位置情報: 緯度=${lat}, 経度=${lng}`);

            // ピンを指す
            const userPosition = { lat, lng };
            console.log("userPosition:",userPosition)
       // 取得した位置に対してピンを指す
        new google.maps.Marker({
            map: map,
            position: userPosition,
            title: "❤なかめ❤",
        });
        console.log("マップにピンを打つ")
        // 取得した現在位置をマップのセンターにして表示
        map.setCenter(userPosition);
        console.log("userPosition:",userPosition)
        map.setZoom(17);
    } catch (error) {
        console.error('エラーが発生しました:', error);
        }
    }
})


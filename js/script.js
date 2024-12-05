// テスト用ボタン（画面移動させてtest.htmlのページへ移動）
$("#btn").on("click", function () {
    console.log("画面移動ボタン押下")
    location.href = "./test.html";
})

// google map にて現在位置取得するボタン
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
  
//   現在位置の取得
    try {
        const position = await getCurrentPosition();
        const userPosition = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        };
        // 取得した現在位置に対してピンを指す
        // google.maps.Markerはgoogleの非推奨らしいので余裕があればAdvancedMarkerElementに変更する
        // new AdvancedMarkerElement({
        new google.maps.Marker({
            map: map,
            position: userPosition,
            title: "現在位置",
        });
        // 取得した現在位置をマップのセンターにして表示
        map.setCenter(userPosition);
        // エラー処理
      } catch (error) {
        console.error("位置情報の取得に失敗しました:", error);
        showError(map.getCenter(), map);
        }
})

async function getCurrentPosition() {
    return new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject);
    });
}
  

// 
$("#btn_list").on("click", function () {
    console.log("画面移動ボタン押下")
    location.href = "./test.html";
})


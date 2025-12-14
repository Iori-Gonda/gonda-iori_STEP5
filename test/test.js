//設問1.テキストボックスとボタン要素と表示エリアを取得
const input = document.getElementById('input');
const outputButton = document.getElementById('outputButton');
const output = document.getElementById('output');

// 設問4用の要素取得と変数
const tableBody = document.querySelector('#myTable tbody');
const addCountDisplay = document.getElementById('addCount');
let addCount = 0; // 追加回数のカウンター

//表示ボタンにクリックイベントを追加
outputButton.addEventListener('click', function() {
    //テキストボックスの内容を取得
    const text = input.value;

    // 設問1：入力チェック
    if (text === "") {
        //空の場合
        output.textContent = "入力値が空です。";
        // CSSの .error クラスを適用して赤文字にする
        output.classList.add('error');
        // エラーの時はハイライトを消す
        output.classList.remove('highlighted');
    } else {
        //入力されてたら、取得した内容をp要素に表示
        output.textContent = text;
        // 正常な入力の時は .error クラスを必ず解除
        output.classList.remove('error');
        //設問3：クラスをトグル（あれば消す、なければ足す）
        output.classList.toggle('highlighted');

        // 【設問4-a】テーブルへの行追加
        const newRow = document.createElement('tr'); // 行を作成
        
        // セルの中身（テキストと削除ボタン）を作成
        newRow.innerHTML = `
            <td>${text}</td>
            <td><button type="button" class="deleteBtn">削除</button></td>
        `;
        // テーブルのtbodyに追加
        tableBody.appendChild(newRow);

        // 設問5：作成した削除ボタンにイベントを設定
        newRow.querySelector('.deleteBtn').addEventListener('click', function() {
            // a) その行をテーブルから削除
            newRow.remove();
            // b) カウントを減少させ、表示を更新
            addCount--;
            addCountDisplay.textContent = addCount;
            // 3回未満になったら「表示」ボタンを再表示
            if (addCount < 3) {
                outputButton.style.display = 'inline-block'; // または 'block'
            }
        });

        // 【設問6】テストデータ制限 (最大3件)
        const rows = tableBody.querySelectorAll('tr');
        if (rows.length > 3) {
            rows[0].remove(); // 一番古い行を削除
            addCount--;       // カウントを1つ戻す
        }

        // 【設問4-b】カウントアップと表示制限
        addCount++;
        addCountDisplay.textContent = addCount;

        if (addCount >= 3) {
            outputButton.style.display = 'none'; // 3回以上でボタンを消す
        }
        
        // 追加されたら入力欄を空にする
        input.value = "";
    }
});

//設問2.背景変えるボタン要素を取得
const changeBackgroundColor = document.getElementById('changeBackgroundColor');

// 1. 関数の「外」で、現在の順番を管理する変数を作る（最初は0番目）
let colorIndex = 0;
const colors = ['lightblue', 'lightgreen', 'lightcoral'];

//背景変えるボタンにクリックイベントを追加
changeBackgroundColor.addEventListener('click', function changeStyle() {
    // 1. まず「現在の番号」の色を適用する（最初は 0 なので青）
    document.body.style.backgroundColor = colors[colorIndex];

    // 2. そのあとで、次のクリックに備えて番号を増やす
    colorIndex = colorIndex + 1;

    // 3. もし最後まで行ったら 0 に戻す
    if (colorIndex === colors.length) {
        colorIndex = 0;
    }
});

// 設問7：1から5までのループ回数を表示
for (let i = 1; i <= 5; i++) {
    console.log("ループ回数: " + i);
}
// --- 設問1. 要素の取得 ---
const input = document.getElementById('input');
const outputButton = document.getElementById('outputButton');
const highlightButton = document.getElementById('highlightButton');
const output = document.getElementById('output');

// 設問4, 6用の要素取得
const tableBody = document.querySelector('#myTable tbody');
const historyTableBody = document.querySelector('#historyTable tbody'); 
const addCountDisplay = document.getElementById('addCount');
let addCount = 0;

// --- 表示ボタンにクリックイベントを追加 ---
outputButton.addEventListener('click', function() {
    const text = input.value;

    if (text === "") {
        output.textContent = "入力値が空です。";
        output.classList.add('error');
        output.classList.remove('highlighted');
    } else {
        output.textContent = text;
        output.classList.remove('error');

        // 【設問4：テーブル①への追加】
        const newRow = document.createElement('tr');
        newRow.innerHTML = `
            <td>${text}</td>
            <td><button type="button" class="deleteBtn">削除</button></td>
        `;
        tableBody.appendChild(newRow);

        // 【設問5：削除ボタンにクリックイベントを追加】
        newRow.querySelector('.deleteBtn').addEventListener('click', function() {
            newRow.remove(); 
            addCount--; // カウントを減らす
            // 数字が変わったらすぐに画面の表示も更新する
            addCountDisplay.textContent = addCount; 

            if (addCount < 3) {
                outputButton.style.display = 'inline-block';
            }
        });

        // 【設問6：履歴テーブル②への追加と制限】
        const historyRow = document.createElement('tr');
        historyRow.innerHTML = `<td>${text}</td>`;
        historyTableBody.appendChild(historyRow);

        const historyRows = historyTableBody.querySelectorAll('tr');
        if (historyRows.length > 3) {
            historyRows[0].remove();
        }

        // 【設問4-b：全体のカウントアップ】
        addCount++;
        addCountDisplay.textContent = addCount;

        if (addCount >= 3) {
            outputButton.style.display = 'none';
        }

        input.value = "";
    }
});

// --- 設問3：ハイライトボタンにクリックイベントを追加（文字がある時だけ動作） ---
highlightButton.addEventListener('click', function() {
    if (output.textContent !== "" && output.textContent !== "入力値が空です。") {
        output.classList.toggle('highlighted');
    }
});

// --- 設問2：背景色変えるボタンにクリックイベントを追加 ---
const changeBackgroundColor = document.getElementById('changeBackgroundColor');
let colorIndex = 0;
const colors = ['lightblue', 'lightgreen', 'lightcoral'];

changeBackgroundColor.addEventListener('click', function() {
    document.body.style.backgroundColor = colors[colorIndex];
    colorIndex = (colorIndex + 1) % colors.length;
});

// --- 設問7：コンソール表示 ---
for (let i = 1; i <= 5; i++) {
    console.log("ループ回数: " + i);
}
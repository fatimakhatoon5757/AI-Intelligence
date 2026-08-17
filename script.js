 async function sendData() {
            const text = document.getElementById('userInput').value;
            const btn = document.getElementById('btn');
            const btnText = document.getElementById('btnText');
            const loaderIcon = document.getElementById('loaderIcon');
            const resultBox = document.getElementById('resultBox');
            const responseText = document.getElementById('responseText');

            if(!text) {
                alert("Please provide some text for the AI to analyze.");
                return;
            }

            btn.disabled = true;
            btnText.innerText = "Processing...";
            loaderIcon.classList.remove('hidden');
            resultBox.classList.add('hidden');

            try {
                const response = await fetch('http://localhost:5678/webhook-test/9caf37f4-49fc-4e4b-95df-4a604171bf0a', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ text: text })
                });

                const data = await response.text();
                responseText.innerText = data;
                resultBox.classList.remove('hidden');
            } catch (error) {
                alert("Connection failed! Check if n8n is active and CORS is enabled.");
            } finally {
                btn.disabled = false;
                btnText.innerText = "Synthesize Now";
                loaderIcon.classList.add('hidden');
            }
        }
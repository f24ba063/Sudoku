export class Timer {
    constructor(displayElement) {
        this.displayElement = displayElement;
        this.timerInterval = null;
        this.elapsedSeconds = 0;
    }

    start() {
        this.stop(); // 二重起動防止
        this.elapsedSeconds = 0;
        this.updateDisplay();

        this.timerInterval = setInterval(() => {
            this.elapsedSeconds++;
            this.updateDisplay();
        }, 1000);
    }

    stop() {
        if (this.timerInterval) {
            clearInterval(this.timerInterval);
            this.timerInterval = null;
        }
    }

    updateDisplay() {
        const mins = String(Math.floor(this.elapsedSeconds / 60)).padStart(2, '0');
        const secs = String(this.elapsedSeconds % 60).padStart(2, '0');
        this.displayElement.textContent = `${mins}:${secs}`;
    }
}
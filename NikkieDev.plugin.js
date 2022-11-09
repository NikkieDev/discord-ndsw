/**
 *
 * @name NikkieDevCustomJS
 * @author NikkieDev_Software
 * @description Custom JS for NikkieDev
 * @version 0.0.3
 *
 */

class modalFuncs
{
	constructor()
	{
		this.font = 0;
		this.debugMode = false;
	}

	changeFont(fontNum)
	{
		switch (fontNum)
		{
			case 1:
				document.body.style.fontFamily = "Consolas, 'Courier New', monospace";
				console.log("[NDEV] Switched to VS code font");
				break;
			case 2:
				document.body.style.fontFamily = "Monocraft";
				console.log("[NDEV] Switched to Monocraft");
				break;
			default:
				this.font = 1;
				this.changeFont(this.font);
				break;
		}
	}
	toggleDebug()
	{
		switch (this.debugMode)
		{
			case false:
				this.debugMode = true;
				console.log("[NDEV] Debug mode enabled");
				break;
			case true:
				this.debugMode = false;
				console.log("[NDEV] Debug mode disabled");
				break;
		}
	}
}

class Core
{
	constructor()
	{
		this.menu = false;
	}	
	toggleMenu()
	{
		const msgWrapper = document.querySelector(".messagesWrapper-RpOMA3");
		let modal = document.createElement("div");
		let modalCore = new modalFuncs();
		
		modal.id = "nd-menu";
		modal.style.cssText = `
			display: flex;
			flex-direction: column;
			padding: 25px;
			justify-content: center;
			align-items: flex-start;
			position: absolute;
			color: white;
			background-color: #2F3136;
			border-radius: 15px;
			top: 50%;
			left: 50%;
			z-index: 10;
			transform: translate(-50%, -50%);
		`;
		modal.innerHTML = `
			<div class='nd-flex nd-row'>
				<label for="toggleDebug">Toggle debug mode</label>
				<button class='nd-btn' id="toggleDebug" name="toggleDebug">Toggle</button>
			</div>
			<div class='nd-flex nd-row'>
				<label for="toggleFont">Toggle font</label>
				<button class="nd-btn" id="toggleFont" name="toggleFont">Toggle</button>
			</div>
			<button class="nd-btn" id="closeMenu" name="closeMenu">Close Menu</button>
		`;
		
		switch (this.menu)
		{
			case false:
				msgWrapper.appendChild(modal);

				let debugBtn = document.querySelector("#toggleDebug");
				let fontBtn = document.querySelector("#toggleFont");
				let closeBtn = document.querySelector("#closeMenu");
		
				debugBtn.addEventListener("click", () => {
					modalCore.toggleDebug();
				});
				fontBtn.addEventListener("click", () => {
					modalCore.font++;
					modalCore.changeFont(modalCore.font);
				});
				closeBtn.addEventListener("click", () => {
					this.toggleMenu();
				});

				this.menu = true;
				console.log("[NDEV] Menu opened");
				break;
			case true:
				msgWrapper.removeChild(document.querySelector("#nd-menu"));
				this.menu = false;
				console.log("[NDEV] Menu closed");
				break;
		}
	}
}

module.exports = class NikkieDev {
	start() {
		let modalCore = new modalFuncs();
		let core = new Core();
		console.clear();

		console.log("[NDEV] Activated custom JS");
		modalCore.changeFont(core.font);

		document.body.addEventListener("keypress", (key) => {
			if (modalCore.debugMode == true)
			{
				console.log(key);
			}
		});
		document.body.addEventListener("keypress", (key) => {
			if (key.code == "Numpad9")
			{
				core.toggleMenu();
			}
		})
	}
	stop() {
		BdApi.alert("NikkieDev Software", "Unloaded NDEV JS");
	}
}
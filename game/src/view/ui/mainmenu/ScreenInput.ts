import MainMenuScreen from "./MainMenuScreen"

class ScreenInputComponent {
    // This is obviously very specific. TODO: abstract menu interaction from MainMenu to reuse in other screens (e.g. pause)
    private componentOwner: MainMenuScreen

    constructor(componentOwner: MainMenuScreen) {
        this.componentOwner = componentOwner
    }

    incrementActiveMenuSelection = () => {
        this.componentOwner.getActiveMenu().incrementActiveSelection()
    }

    decrementActiveMenuSelection = () => {
        this.componentOwner.getActiveMenu().decrementActiveSelection()
    }

    selectOption = () => {
        this.componentOwner.getActiveMenu().selectActiveSelection()
    }
   
}

export default ScreenInputComponent
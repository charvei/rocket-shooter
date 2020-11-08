import MainMenuScreen from "../../../view/ui/mainmenu/MainMenuScreen"

class UICommands {
    static makeIncrementMenuSelectionCommand = (menuScreen: MainMenuScreen): () => void => {
        return (): void => {
            menuScreen.input.incrementActiveMenuSelection()
        }
    }

    static makeDecrementMenuSelectionCommand = (menuScreen: MainMenuScreen): () => void => {
        return (): void => {
            menuScreen.input.decrementActiveMenuSelection()
        }
    }

    static makeSelectOptionCommand = (menuScreen: MainMenuScreen): () => void => {
        return (): void => {
            menuScreen.input.incrementActiveMenuSelection()
        }
    } 
}

export default UICommands
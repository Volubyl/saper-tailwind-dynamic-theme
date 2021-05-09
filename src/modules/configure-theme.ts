import { writable } from 'svelte/store'

type StoreDefaultValues = {
    isLoaded: boolean
}

type ThemeConfig = {
    colors: { [key: string]: string }
}

const createThemeStore = () => {
    const defaultValues: StoreDefaultValues = {
        isLoaded: false,
    }

    const { subscribe, update } = writable(defaultValues)

    const setIsLoaded = (isLoaded: boolean) => {
        update(currentData => {
            return {
                ...currentData,
                isLoaded,
            }
        })
    }

    return {
        subscribe,
        setIsLoaded,
    }
}

export const themeStore = createThemeStore()

const getThemeProperties = (): Promise<ThemeConfig> => {
    // call API for getting theme value here
    return new Promise(resolve => {
        const wait = setTimeout(() => {
            clearTimeout(wait)
            resolve({
                colors: {
                    'community-primary': 'red',
                },
            })
        }, 2000)
    })
}

export const configureTheme = async (): Promise<void> => {
    themeStore.setIsLoaded(false)
    const theme = await getThemeProperties()
    Object.keys(theme.colors).forEach(key => {
        document.documentElement.style.setProperty(`--${key}`, theme.colors[key])
    })
    themeStore.setIsLoaded(true)
}

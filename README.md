# React visual novel game engine

Table- [React visual novel game engine](#react-visual-novel-game-engine)

- [React visual novel game engine](#react-visual-novel-game-engine)
  - [File tree](#file-tree)
  - [Features](#features)

## File tree

```
📦public
┣ 📜favicon.ico
┣ 📜index.html
┣ 📜logo192.png
┣ 📜logo512.png
┣ 📜manifest.json
┗ 📜robots.txt
📦src
┣ 📂assets
┃ ┣ 📂bgm
┃ ┣ 📂fonts
┃ ┣ 📂images
┃ ┃ ┣ 📂bg
┃ ┃ ┣ 📂characters
┃ ┃ ┃ ┣ 📂Female
┃ ┃ ┃ ┃ ┣ 📂accessories
┃ ┃ ┃ ┃ ┣ 📂backhairs
┃ ┃ ┃ ┃ ┣ 📂blush
┃ ┃ ┃ ┃ ┣ 📂expressions
┃ ┃ ┃ ┃ ┣ 📂fronthairs
┃ ┃ ┃ ┃ ┣ 📂outfits
┃ ┃ ┃ ┗ 📂Male
┃ ┃ ┃ ┃ ┣ 📂accessories
┃ ┃ ┃ ┃ ┣ 📂backhairs
┃ ┃ ┃ ┃ ┣ 📂expressions
┃ ┃ ┃ ┃ ┣ 📂fronthairs
┃ ┃ ┃ ┃ ┣ 📂outfits
┃ ┗ 📂story
┃ ┃ ┣ 📜characters.json
┃ ┃ ┗ 📜story.json
┣ 📂components
┃ ┣ 📜AnimatedText.tsx
┃ ┣ 📜Background.tsx
┃ ┣ 📜Character.tsx
┃ ┣ 📜CharacterMaker.tsx
┃ ┣ 📜DialogueBox.tsx
┃ ┣ 📜InitialBrand.tsx
┃ ┣ 📜SceneEditor.tsx
┃ ┣ 📜SceneManager.tsx
┃ ┗ 📜TitleScreen.tsx
┣ 📂hooks
┃ ┣ 📜useAudio.tsx
┃ ┣ 📜useBeforeunload.tsx
┃ ┣ 📜useDocumentTitle.tsx
┃ ┣ 📜useEventListener.tsx
┃ ┣ 📜useIntro.tsx
┃ ┣ 📜useIsomorphicLayoutEffect.tsx
┃ ┣ 📜useLocalStorage.tsx
┃ ┣ 📜useOnClickOutside.tsx
┃ ┣ 📜useSafeContext.tsx
┃ ┗ 📜useWindowSize.tsx
┣ 📂loader
┃ ┣ 📜bgImages.ts
┃ ┣ 📜bgMusic.ts
┃ ┗ 📜femaleSprites.ts
┣ 📂types
┃ ┗ 📜enum.ts
┣ 📜App.tsx
┣ 📜index.css
┣ 📜index.tsx
┣ 📜logo.svg
┣ 📜react-app-env.d.ts
┣ 📜reportWebVitals.ts
┣ 📜service-worker.ts
┣ 📜serviceWorkerRegistration.ts
┗ 📜setupTests.ts
```

## Features

-   [ ] General
    -   [ ] Title screen (Recreate)
-   [x] Homepage (Intro)
    -   [x] Intro
        -   [x] Initialize music
    -   [x] Option menu
    -   [x] Quick access sound
    -   [x] Quick access fullscreen
    -   [ ] Interactable characters (Optional)
-   [x] Game output
    -   [x] Characters
    -   [x] Background
    -   [x] Dialogue
    -   [x] Controls
    -   [ ] Choices (Optional)
    -   [ ] History (Optional)
    -   [ ] Quick menu
    -   [ ] Ending
-   [ ] Editor (CRUD)
    -   [x] Scenes
    -   [x] Characters
    -   [x] Background
    -   [x] Background music
    -   [ ] Animate
    -   [ ] Transition
    -   [ ] Voice (Optional)
    -   [ ] Sound effects (Optional)
    -   [ ] Story choices (Optional)

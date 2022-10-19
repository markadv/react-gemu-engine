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
┃ ┣ 📜BackgroundChooser.tsx
┃ ┣ 📜Character.tsx
┃ ┣ 📜CharacterMaker.tsx
┃ ┣ 📜CharacterMakerButton.tsx
┃ ┣ 📜ConfigMenuScreen.tsx
┃ ┣ 📜DatalistInput.tsx
┃ ┣ 📜DialogueBox.tsx
┃ ┣ 📜Disclaimer.tsx
┃ ┣ 📜InitialBrand.tsx
┃ ┣ 📜OptionsButtons.tsx
┃ ┣ 📜SceneEditor.tsx
┃ ┣ 📜SceneEditorButtons.tsx
┃ ┣ 📜SceneManager.tsx
┃ ┗ 📜TitleScreen.tsx
┃ ┗ 📜VideoScene.tsx
┣ 📂hooks
┃ ┣ 📜useBeforeunload.tsx
┃ ┣ 📜useDocumentTitle.tsx
┃ ┣ 📜useEventCallback.tsx
┃ ┣ 📜useEventListener.tsx
┃ ┣ 📜useIntro.tsx
┃ ┣ 📜useIsomorphicLayoutEffect.tsx
┃ ┣ 📜useLocalStorage.tsx
┃ ┣ 📜useOnClickOutside.tsx
┃ ┣ 📜useSafeContext.tsx
┃ ┗ 📜useScreenOrientation.tsx
┃ ┗ 📜useWindowSize.tsx
┣ 📂loader
┃ ┣ 📜bgImages.ts
┃ ┣ 📜bgMusic.ts
┃ ┗ 📜femaleSprites.ts
┃ ┗ 📜sfx.ts
┃ ┗ 📜videos.ts
┃ ┗ 📜voices.ts
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

-   [x] General
    -   [x] Title screen (Recreate)
-   [x] Homepage (Intro)

    -   [x] Intro
        -   [x] Initialize music
    -   [x] Option menu
    -   [x] Quick access sound
    -   [x] Quick access fullscreen

-   [x] Game output
    -   [x] Characters
    -   [x] Background
    -   [x] Dialogue
    -   [x] Controls
    -   [x] Quick menu
    -   [x] Ending
-   [ ] Editor (CRUD)
    -   [x] Scenes
    -   [x] Characters
    -   [x] Background
    -   [x] Background music
    -   [x] Animate
    -   [x] Transition
    -   [x] Voice (Optional)

Future updates

-   [ ] Interactable characters
-   [ ] Choices
-   [ ] History
-   [ ] Sound effects
-   [ ] Choices

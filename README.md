# Purpose

This repository demonstrate how we could use tailwind with dynamic variables in a sapper application context. 

This POC was inspired by [this stack over flow post](https://stackoverflow.com/questions/61508409/how-to-change-tailwind-config-js-dynamically-based-on-user-settings-in-rails) and adapted to fit with [Sapper](https://sapper.svelte.dev/)


## What this POC try to achieve

Sometimes we might need to change a color value, a font, a css  dynamically. By design [tailwind](https://tailwindcss.com/) create the CSS stylesheet used by the application at build time.

To achieve this task tailwlind requires to use a tool such as webpack or postcss which are not really build to regenerate assets at run time. 

Perhaps we can take a different direction without trying to rebuild the sheet. And this without trying to hack webpack or postcss.

## Principle : CSS variables for the win

CSS variables (more precisely [CSS custom properties](https://developer.mozilla.org/en-US/docs/Web/CSS/Using_CSS_custom_properties)) are the corner stone here.

The main idea is to use them to "prepare" our custom [tailwind configuration](https://tailwindcss.com/docs/customizing-colors) to be filled with CSS variables.

As you can see [here](https://github.com/Volubyl/saper-tailwind-dynamic-theme/blob/main/tailwind.config.js#L16), we create a custom color called `community` which will receive the value of `--community-primary` css custom property.

In order to work, we first need to declare this variable and to make them accessible globally. For this purpose, we can embed the variables on the `root` pseudo class.

[Here](https://github.com/Volubyl/saper-tailwind-dynamic-theme/blob/main/static/global.css#L1), I declare this root block inside  the preexisting `gobal.css` file but those variables might also be declared in a brand new css file.

Note that the default value of those variable are not important here since they will be override.


### The tailwind css file generation

Now we have all the variables we need. It's time to generate the tailwind style sheet. In this POC I used [PostCSS](https://postcss.org/) but the process should be similar with webpack.

For now, we can run the `npm run build:tailwind` to generate the file.

Now you can look in your `static/index.css` file to see if the css variables has been used.

In this file your should see something like this

```css
.text-community-primary {
  color: var(--community-primary);
}
```

This shows that tailwind has used the custom colour we previoulsy added in  [the configuration file](https://github.com/Volubyl/saper-tailwind-dynamic-theme/blob/main/tailwind.config.js#L16)

### Using JS to set the CSS variables

Great. We've created the variables that will be used by tailwind. We just need to give them a value.

A benefit of using variables is that this is quiet easy to update their values with few line of JS code like this.


```
// userSelectedColor is the future value of --community-primary

document.documentElement.style
    .setProperty('--community-primary', userSelectedColor);

```

*But where to achieve this ?*

The thing we need to keep in mind is because Sapper is an SSR framework it has two side : a server side and a client.

Server side, Sapper does not know about things like `window`, `document` and all those browser stuff only. So, we must ensure to override those variables client side only.

IMHO, the best place to do this operation is inside the [`client` file](https://github.com/Volubyl/saper-tailwind-dynamic-theme/blob/main/src/client.ts#L4).

Here I decided to wrap the overriding process in a [utility function](https://github.com/Volubyl/saper-tailwind-dynamic-theme/blob/main/src/modules/configure-theme.ts#L53)

### Getting values asynchronously


The value we give to CSS variables can come from different places. Those might be selected by the user directly using a form, a color picker, ... but those values could also be provided by a third service like an API.

This is the case I simulated [here](https://github.com/Volubyl/saper-tailwind-dynamic-theme/blob/main/src/modules/configure-theme.ts#L39).

In this case, this API might be long to respond. If we display the application to the user before getting the values, he/she will see the app rendered after the API called finished.

This is not really smooth for the user. A better idea, could be to display the application only when all the values are set. Otherwise, during the API call, a loader will be display.

This is what we see [here](https://github.com/Volubyl/saper-tailwind-dynamic-theme/blob/main/src/routes/_layout.svelte#L8).

The loading state is managed by a [svelte store](https://svelte.dev/tutorial/writable-stores)


###  Want to try ?

1. Clone this repository
2. Run `npm run install`
3. Go to `localhost:3000`



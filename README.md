# HTML Templates
Project created to speed up html creation when you already have a template to use, such as transactional e-mails where you need to send the same e-mail with different products in it.

## How to use it
- Open ```index.html```
- in there you have 3 tabs: **Code**, **Placeholders** and **Template**

### Code Tab
In this tab, you can write your html code as you wish. This will be your template, or your skeleton code, that you will use as a structure to build more htmls with the same layout.

![Code](https://github.com/brenorobazza/html-templates/blob/main/README_aux/code.png?raw=true)

In this code, you can use **placeholders**. They are words that you put between curly brackets, like ```{image_source}``` or ```{image_alt}``` in the example:

```html
<img src="{image_source}" alt="{image_alt}"/>
```

The placeholders are the "variables" that you want to change when you use the template to build more code.

### Placeholders tab
When you finish your code, you can go to this tab and click the "**Build placeholders table**" button. This will build a table with all your placeholders like tihs:

![Placeholders](https://github.com/brenorobazza/html-templates/blob/main/README_aux/placeholders.png?raw=true)

In the second column you put the values that will replace the placeholders in the code. When you finish, you can click the "**Build Final HTML**" button, this will replace all placeholders in the code for the values that you chose. If you didn't add a value, the placeholder will remain.

> **IMPORTANT**:  
> When you generate the final HTML, the placeholders you changed in the code will be replaced by the values, so you won't be able to change again because they are not placeholders anymore. I'm working to fix this

### Template tab
This tab is were you upload your .html file if you already have a template ready, so you don't have to copy it's text.
When you upload a file, the placeholders tab will build the table automagically


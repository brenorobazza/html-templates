# HTML Templates
Project created to speed up html creation when you already have a template to use, such as transactional e-mails where you need to send the same e-mail with different products in it.

## How to use it
- Open ```index.html```
- in there you have 3 tabs: **Code**, **Placeholders** and **Template**

### Code Tab
In this tab, you can write your html code as you wish. This will be your template, or your skeleton code, that you will use as a structure to build more htmls with the same layout.

In this code, you can use **placeholders**. They are words that you put between curly brackets, like ```{image_source}``` or ```{image_alt}``` in the example:

```html
<img src="{image_source}" alt="{image_alt}"/>
```

The placeholders are the "variables" that you want to change when you use the template to build more code.

### Placeholders tab
When you finish your code, you can go to this tab and click the "Build placeholders table" button. This will build a table with all your placeholders

![Placeholders](https://github.com/brenorobazza/html-templates/README_aux/placeholders.png)



<h2> BeMo Challenge </h2>

My submission for the Developer Functional Test

I was able to fulfill most of the requirements for the test, with the exception of the following:

1. D)a. The main images are static files instead of uploadable files. I would be able to implement this using more time. I was able to create it that a user can add an Image to the main Content of your page easily by just adding the image URL. 
2. D)b. I was not able to implement an easy toggle for the noindex meta tag in the index.html.  
3. D)e. I did not have time to add a dynamic title and description for each page.
4. D)f. The GA id needs to be added inside the client folder ga.js file in order to get GA to work ( I used react-ga package).
5. D)g. The email system is not implemented, I ran out of time.
6. J) Did not score above 80 on the PageSpeed tool.


With extended time, I would: 
1. Create a an API point that accepts files and then host those files in an S3 bucket in order for the file upload to possible in Heroku.
2. Require the use of React-Helmet, a pkg that lets you deal with the meta tags in a react page.
3. Test the facebook pixel and GA.
4. Create an API end point using NodeMailer. There may be additional set up needed for it for work in Heroku. 
5. Create a dynamic page creator that would render a new page for each Content Object the user creates.

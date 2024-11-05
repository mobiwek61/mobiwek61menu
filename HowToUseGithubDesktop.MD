
### Summary of how to do github on a pc or 'nix: 
- These are the author's personal notes to describe the **automagic** authentication features used between the browser and github desktop. **This is an attempt** to describe how they work and may be **totally incorrect**.    
- Github desktop **(gtd)** is downloaded from github and I use it on a PC.  
  **this is how gtd authenticates with github:**
  - **gtd** uses the browser to handle authentication.    
  - you login to github as one more more users with a browser (ms-edge). If 2fa authentication is used, the browser takes care of that.  
  - To **switch or add logged in users on browser** when in github, click on the **user icon at top right and click the left-right arrow thing**.  Only one user is active at a time, but you don't need to do the whole login process to switch.  


### How to setup github repo with 2fa.
- Using github webpage, setup repo with 2 factor authentication (2fa)   
To do: click on icon of you the user, choose "setting" with the gear, choose "password and authentication" and scroll down to "Two-factor authentication", then choose the option
"authenticator app". Webpage then shows a qr code; scan this with the app and it appears on
the app with proper repo name.
- Note: this gives access any repo for this user; using deploy keys in only for one repo.

### How to open repo with "github desktop" "gtd" (includes logging in as user)
- First authenticate your github account with github desktop:  
File->options->Accounts->"sign into github.com"  
It starts your browser with signin page. Somehow the browser manages signin.  
You put in user/password, then it asks for the 2fa code you get from the android app.  
The webpage asks if you want to authorize "github desktop".  Say yes.  
Github desktop then appears showing your repos.
### Now open another "user in github desktop" to see how multiple users are handled.  
- You need to login the other github user: on github webpage click on the user icon,  
**then click on the left/right arrow thing** which means **switch user**.  Then login, it will do
the prompts for 2fa. Sometimes its authenticator app, other accounts use a text code.    
File->options->Accounts->Sign out of account (the repo will still be there then you sign back in)  
File->options->Accounts->Signin to other account; it will show you webpage where you grant access to "github desktop"  
Then when you open or clone repository it shows repos for the new user.   
Switching back and forth is fast in gtd; the browser shows all logged-in users. The "current repositry"
thing at top works only for currently loggedin user.   
To push repo changes, you must have gtd switched to the proper user or it gives "unauthorized" message or a **misleading** message that "repo no longer exists".   

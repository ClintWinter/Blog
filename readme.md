# Clint's Blog

RESTful blog template. 

* Uses passport/passport-local for user management. 
* MongoDB/mongoose for database.  

Obviously you must have node/npm/mongodb installed on your computer to use this.  

This blog is setup specifically so only admins have authorization to edit/create/delete posts. This is meant to be used as a personal journal, so only the admin has the ability to manipulate posts and the only one to read them if desired. Without being logged in, only the date of posts are seen. Only the admin can create new accounts, and those accounts are not admin and can only view posts.

## TODO

* "Are you sure?" for delete button--I don't want to accidentally remove an entire post.
* Create a sidebar in posts/show that links to other posts from that same month.
* Create next/previous buttons at the bottom of posts/show that go forward/back in time.
* Non-admin account manager. List and delete/update guest accounts.
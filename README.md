# Multithreading in Nodejs

This project is an implementation of [How To Use Multithreading in Node.js Digital Ocean tutorial](https://www.digitalocean.com/community/tutorials/how-to-use-multithreading-in-node-js).

In this project, you'll find an Express server that has three routes:

- `/blocking`: executes an intensive CPU task, blocking the thread.
- `/non-blocking`: it executes the same task above but doesn't block the thread.
- `/hello`: simple print on the screen. It serves to test if the thread is blocked or not.

## How to run

There are two servers. The `index.js` will run with one thread and `index_four.js` with four. The difference between them is that how **index_four** uses four threads, their responses will be faster.

```sh
node index.js # runs with one thread

node index_four.js # runs with four threads
``` 

Access the `/hello` and see the message on the screen. Perceives how fast is the response. 

Now, access the `/blocking` and, at same time, reload the `/hello` page. You'll notice that the page `/hello` will send the hello after the `/blocking` response. 

If you change `/blocking` for `/non-blocking`, you'll notice that the task will be executed, but in another thread. Therefore, the response of `/hello` won't be impacted.

## Commands

- pgrep <process>
It's the same: ps | grep <process>

Use this command to grep specifically **process**.

- top -H -p <process_id>

Use this command to see the Nodejs' threads.

**-H** instructs top to display threads in a process. The **-p** flag instructs top to monitor only the activity in the given process ID.
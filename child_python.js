const { spawn } = require("child_process");
const path = require("path");

const child = (file) => {
  try {
    const pythonProcess = spawn(
      path.join(__dirname, "/venv/Scripts/python.exe"),
      [file]
    );

    pythonProcess.stdout.on("data", (data) => {
      console.log(`stdout: ${data}`);
    });

    pythonProcess.stderr.on("data", (data) => {
      console.error(`stderr: ${data}`);
    });

    pythonProcess.on("close", (code) => {
      console.log(`child process exited with code ${code}`);
    });
  } catch (err) {
    console.log("some error occured", err);
  }
};

module.exports = { child };

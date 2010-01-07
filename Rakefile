task :default do
  `cat jQueryTerminalConsole.js | ./Output-bookmarklet.pl > Bookmarklet.html`
end

# I Am Pretty Sure This Only Works On Mac
task :open => :default do
  `open Bookmarklet.html`
end
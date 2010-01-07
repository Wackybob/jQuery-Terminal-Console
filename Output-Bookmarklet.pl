#!/usr/bin/env perl
#

use strict;
use warnings;
use URI::Escape qw(uri_escape_utf8);
use open  IO  => ":utf8",       # UTF8 By Default
          ":std";               # Apply To STDIN/STDOUT/STDERR

my $src = do { local $/; <> };

# Zap The First Line If There'S Already A Bookmarklet Comment:
$src =~ s{^// ?javascript:.+\n}{};
my $bookmarklet = $src;

for ($bookmarklet) {
    s{^\s*//.+\n}{}gm;  # Kill Comments
    s{\t}{ }gm;         # Tabs To Spaces
    s{[ ]{2,}}{ }gm;    # Space Runs To One Space
    s{^\s+}{}gm;        # Kill Line-Leading Whitespace
    s{\s+$}{}gm;        # Kill Line-Ending Whitespace
    s{\n}{}gm;          # Kill Newlines
}

# Escape single- and double-quotes, spaces, control chars, unicode:
$bookmarklet = "javascript:" .
    uri_escape_utf8($bookmarklet, qq('" \x00-\x1f\x7f-\xff));

print "<a href='$bookmarklet' title='jQuery Terminal Console'>jQuery Terminal Console</a>"

# Add The Bookmarklet Script To The First Line Of The Source File
#print "// $bookmarklet\n" . $src;

# Put bookmarklet on clipboard:
#`/bin/echo -n '$bookmarklet' | /usr/bin/pbcopy`;

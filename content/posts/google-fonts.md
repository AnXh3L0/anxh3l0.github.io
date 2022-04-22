+++
title = "Google Fonts installer"
date = "2021-06-06 23:50:00"
images = ['/img/posts/google-fonts.webp']
description = 'A script to install all Google Fonts locally'
tags = ["fonts", "google", "script", "privacy", "local", "offline"]
categories = ["script", "privacy"]
+++

This is a very short post, the **first of a series** I'm going to write regarding Linux installations and helpful scripts.

I just started writing and [published a very first version of a script](https://github.com/AnXh3L0/localfonts-google) that aims to improve privacy and usability on the web. This script downloads the current version of [Google Fonts repo](https://github.com/google/fonts), creates a new empty directory that holds these files, and then ```grep```-s all the ```.ttf``` files. These fonts are then included in a new folder named ```google-fonts```.

Afterwards, the script tries to detect your OS (operating system) and then if Linux or MacOS is detected, it moves (installs) these fonts in the local ```.fonts``` folder (if Linux) and ```/Library/Fonts/``` (if MacOS).

To complement this script, you will have to block all Google Fonts on your browser, using uBlock Origin. You can find a list for that on my [blocklist page](/blocklist) from [theel0ja](https://github.com/theel0ja/CrapBlock), until I automate this process with the script (expect that on a v3 or v4).

All content is licensed under CC BY-NC-SA 4.0. ([Attribution-NonCommercial-ShareAlike 4.0 International](https://creativecommons.org/licenses/by-nc-sa/4.0/)).

+++
title = "The truth about e-mail"
date = "2018-10-10 12:00:00"
images = ['/img/posts/email.png']
description = 'A short beginner-friendly intro on e-mail ins and outs'
tags = ["email", "privacy", "tips", "beginner", "foss"]
categories = ["article", "privacy", "blog"]
+++

Before reading this article, you might want to take a look at the ["Threat Modeling" article](/threat-modeling).

There are many misconceptions about e-Mail, thanks to marketing efforts of companies looking to score a quick buck off the privacy scandals. Such companies include Protonmail, Tutanota et al. This post intends to teach you some basics so you can make an educated decision, unswayed by corporate greed.

> E-Mail is **almost** always public. E-Mails are essentially postcards. It can be encrypted in transit [1], but it will always be visible and accessable to the servers involved. There is absolutely no way to avoid this. The e-mail protocol is old and was never designed for privacy.

> You need to encrypt yourself. The most common way to do so is PGP, which is supported by a wide array of clients [2] and thoroughly tested.

> Even PGP is not a a perfect solution. Some of the metadata will always be unencrypted. Subject line/sender/recipient/timestamp/etc. can already be used to create detailed profiles of you. There is no way to avoid this. You might want to keep the subject line light.

> Providers claiming they cannot scan/sell/analyze your data are always a scam. They can, and as stated before: there is no way around it.

> A way to ensure fully private e-mail communication is to only use a single server that you trust. Internal messages stay on that server/in that network, provided you use TLS/SSL. More on selfhosting at a later point.

> If you don't pay, you are most likely the product. Unless your provider of choice is an actual non-profit organisation run by a small community of ordinary people you should stay away from free providers if you possibly can. This is a general rule. There are cheap services that you might be able to afford. While of course not being any more trustable tech-wise, there's at least a smaller conflict of interest with them.

[1] You can check if your message was encrypted in transit with a Thunderbird addon called [Paranoia](https://addons.thunderbird.net/en-US/thunderbird/addon/paranoia). <br />[2] You can use [Enigmail](https://www.enigmail.net/index.php/en/) for Thunderbird to easily deploy PGP in daily life without any effort on your end.

This post is mirrored from [Privacy Today channel](https://t.me/privacytoday). Privacy Today is a group about all things privacy, open source, libre philosophy and more!

All content is licensed under CC BY-NC-SA 4.0. ([Attribution-NonCommercial-ShareAlike 4.0 International](https://creativecommons.org/licenses/by-nc-sa/4.0/)).

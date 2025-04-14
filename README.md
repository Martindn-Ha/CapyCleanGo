# Too busy to clean up? Stop the CAP! Save the planet with Glip, the one and only CAPY-CAPY-BARA (and get yourself some CapyCredit while you're at it 😉). Clean Up the Cosmos, One Snap at a Time!

## Inspiration

While I was attending FullyHacks, I noticed a paper bag blowing about in the wind. Nobody really went ahead to throw it away. I figured that I'd do it myself and that’s when I thought "Hey, people would probably be more inclined to throw away trash if was a bit more fun. Having always been interested in machine learning and video games, I thought I'd go ahead and combine something I enjoyed with a real-world problem I just witnessed.

## What it does

CapyCleanGo! is a mobile app game where users can take pictures of trash where ever they may be and receive "CapyCredit", an in-game currency. However, anyone can take pictures of trash littered about the floor and do nothing about it.  Therefore, the users are rewarded on 3 criteria which much be met in the picture itself:

1. The image must contain a identifiable trash object.
2. The image must contain the user's hand.
3. The image must contain an identifiable trash bin.

This way, users are encouraged to actually throw away trash rather than just take a picture to cheat their way through the game.

## How we built it

We used react-native-expo which was an extreme challenge given our lack of mobile development experience as well as react-native in general. Moreover, we utilized a Node.js backend for API calls and ngrok to facilitate connections between the front and back-end.

## Challenges we ran into

Initially, setting up react-native-expo was difficult because of our lack of knowledge setting up mobile applications. Once we overcame that hurdle, through hours of trial and error, we ran into issues connecting our react-native front-end to the back-end. The reason for this was also because of our lack of knowledge with full-stack development. After some time researching, we found out about ngrok, which greatly helped us with our connection issues.

## Accomplishments that we're proud of

We're extremely proud of the fact that we got the camera to work in our application and not only that, but having the app be able to send the snapshot take, have the image run through a trash object detection model, and output an image of the identified object, encapsulated in a box, with labels corresponding to the predicted class.

## What we learned

We learned how to set-up and use react-native expo and its routing features as well as the fundamentals of connections the front and back end on a local host machine.

## What's next for CapyCleanGo!

We aim to bring about multiplayer feature in the future! Similar to the concept of PokemonGo, users will be able to go about a virtual map picking up trash (rather than animals) and gain CapyCredits for in-game cosmetics. Moreover, there will be an in-game shop in the points tab where users can unlock other CapyBaras besides Glip (we still love Glip though!).

Additionally, outside of the app itself, we can actually use the same camera technology for trash bins themselves! While making this project, we noticed a lot of recyclables and non-recycables placed in the wrong bins. If we were to use this same camera technology and have them attached to bins, we can have it such that the trash bins themselves will sort out the trash, reducing unnecessary waste!

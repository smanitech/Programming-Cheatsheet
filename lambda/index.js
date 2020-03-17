// This sample demonstrates handling intents from an Alexa skill using the Alexa Skills Kit SDK (v2).
const Alexa = require('ask-sdk-core');
const data = [
      'argument: <break time="1s"/> A value passed to a function when it is called.',
      'block: <break time="1s"/> Sequence of statements enclosed in curly braces.',
      'buffer: <break time="1s"/> A region of storage used to hold data. IO facilities often store input (or output) in a buffer and read or write the buffer independently of actions in the program. Output buffers usually must be explicitly flushed to force the buffer to be written. By default, reading cin flushes cout; cout is also flushed when the program ends normally.',
      'cerr: <break time="1s"/> ostream object tied to the standard error, which is often the same stream as the standard output. By default, writes to cerr are not buffered. Usually used for error messages or other output that is not part of the normal logic of the program.',
	  'cin: <break time="1s"/> iistream object used to read from the standard input.',
	  'class: <break time="1s"/> C++ mechanism for defining our own data structures. The class is one of the most fundamental features in C++. Library types, such as istream and ostream, are classes.',
	  'class type: <break time="1s"/> A type defined by a class. The name of the type is the class name.',
	  'clog: <break time="1s"/> ostream object tied to the standard error. By default, writes to clog are buffered. Usually used to report information about program execution to a log file.',
	  'comments: <break time="1s"/> Program text that is ignored by the compiler. C++ has two kinds of comments: single-line and paired. Single-line comments start with a //. Everything from the // to the end of the line is a comment. Paired comments begin with a /* and include all text up to the next */.',
	  'condition: <break time="1s"/> An expression that is evaluated as true or false. An arithmetic expression that evaluates to zero is false; any other value yields true.',
	  'cout: <break time="1s"/> ostream object used to write to the standard output. Ordinarily used to write the output of a program.',
	  'data structure: <break time="1s"/> A logical grouping of data and operations on that data.',
	  'expression: <break time="1s"/> The smallest unit of computation. An expression consists of one or more operands and usually an operator. Expressions are evaluated to produce a result.',
	  'for statement: <break time="1s"/> Control statement that provides iterative execution. Often used to step through a data structure or to repeat a calculation a fixed number of times.',
	  'function: <break time="1s"/> A named unit of computation.',
	  'header: <break time="1s"/> A mechanism whereby the definitions of a class or other names may be made available to multiple programs. A header is included in a program through a #include directive.',
	  'if statement: <break time="1s"/> Conditional execution based on the value of a specified condition. If the condition is true, the if body is executed. If not, control flows to the statement following the else if there is one or to the statement following the if if there is no else.',
	  'iostream: <break time="1s"/> Library type providing stream-oriented input and output.',
	  'istream: <break time="1s"/> Library type providing stream-oriented input.',
	  'manipulator: <break time="1s"/> Object, such as std::endl, that when read or written "manipulates" the stream itself.',
	  'member function: <break time="1s"/> Operation defined by a class. Member functions ordinarily are called to operate on a specific object.',
	  'method: <break time="1s"/> Synonym for member function.',
	  'namespace: <break time="1s"/> Mechanism for putting names defined by a library into a single place. Namespaces help avoid inadvertent name clashes. The names defined by the C++ library are in the namespace std.',
	  'ostream: <break time="1s"/> Library type providing stream-oriented output.',
	  'parameter list: <break time="1s"/> Part of the definition of a function. Possibly empty list that specifies what arguments can be used to call the function.',
	  'return type: <break time="1s"/> Type of the value returned by a function.',
	  'statement: <break time="1s"/> The smallest independent unit in a C++ program. It is analogous to a sentence in a natural language. Statements in C++ generally end in semicolons.',
	  'variable: <break time="1s"/> A named object.',
	  'while statement: <break time="1s"/> An iterative control statement that executes the statement that is the while body as long as a specified condition is true. The body is executed zero or more times, depending on the truth value of the condition.'
];

const GET_FACT_MESSAGE = "Here is a c Terminology: <break time='2s'/> " ;

const LaunchRequestHandler = {
    canHandle(handlerInput) {
        return handlerInput.requestEnvelope.request.type === 'LaunchRequest';
    },
    handle(handlerInput) {
        const speechText = 'Welcome to Programming Cheatsheet, you can increase or recall C programming knowledge by asking me "Tell me some C Terminology"';
        return handlerInput.responseBuilder
            .speak(speechText)
            .reprompt(speechText)
            .getResponse();
    }
};
const GetNewFactIntentHandler = {
    canHandle(handlerInput) {
        return handlerInput.requestEnvelope.request.type === 'IntentRequest'
            && handlerInput.requestEnvelope.request.intent.name === 'GetNewFactIntent';
    },
    handle(handlerInput) {
        const factArr = data;
        const factIndex = Math.floor(Math.random() * factArr.length);
        const randomFact = factArr[factIndex];
        const speechOutput = GET_FACT_MESSAGE + randomFact;


        const speechText = speechOutput;
        return handlerInput.responseBuilder
            .speak(speechText)
            //.reprompt('add a reprompt if you want to keep the session open for the user to respond')
            .getResponse();
    }
};
const HelpIntentHandler = {
    canHandle(handlerInput) {
        return handlerInput.requestEnvelope.request.type === 'IntentRequest'
            && handlerInput.requestEnvelope.request.intent.name === 'AMAZON.HelpIntent';
    },
    handle(handlerInput) {
        const speechText = 'You can say Tell me some C Terminology, or, you can say exit... What can I help you with?';
        const HELP_REPROMPT = 'What can I help you with?';
        return handlerInput.responseBuilder
            .speak(speechText)
            .reprompt(HELP_REPROMPT)
            .getResponse();
    }
};
const CancelAndStopIntentHandler = {
    canHandle(handlerInput) {
        return handlerInput.requestEnvelope.request.type === 'IntentRequest'
            && (handlerInput.requestEnvelope.request.intent.name === 'AMAZON.CancelIntent'
                || handlerInput.requestEnvelope.request.intent.name === 'AMAZON.StopIntent');
    },
    handle(handlerInput) {
        const speechText = 'Goodbye!';
        return handlerInput.responseBuilder
            .speak(speechText)
            .getResponse();
    }
};
const SessionEndedRequestHandler = {
    canHandle(handlerInput) {
        return handlerInput.requestEnvelope.request.type === 'SessionEndedRequest';
    },
    handle(handlerInput) {
        // Any cleanup logic goes here.
        return handlerInput.responseBuilder.getResponse();
    }
};

// The intent reflector is used for interaction model testing and debugging.
// It will simply repeat the intent the user said. You can create custom handlers
// for your intents by defining them above, then also adding them to the request
// handler chain below.
const IntentReflectorHandler = {
    canHandle(handlerInput) {
        return handlerInput.requestEnvelope.request.type === 'IntentRequest';
    },
    handle(handlerInput) {
        const intentName = handlerInput.requestEnvelope.request.intent.name;
        const speechText = `You just triggered ${intentName}`;

        return handlerInput.responseBuilder
            .speak(speechText)
            //.reprompt('add a reprompt if you want to keep the session open for the user to respond')
            .getResponse();
    }
};

// Generic error handling to capture any syntax or routing errors. If you receive an error
// stating the request handler chain is not found, you have not implemented a handler for
// the intent being invoked or included it in the skill builder below.
const ErrorHandler = {
    canHandle() {
        return true;
    },
    handle(handlerInput, error) {
        console.log(`~~~~ Error handled: ${error.message}`);
        const speechText = `Sorry, I couldn't understand what you said. Please try again.`;
        const ERROR_MESSAGE = `Sorry, an error occurred.`;

        return handlerInput.responseBuilder
            .speak(speechText)
            .reprompt(ERROR_MESSAGE)
            .getResponse();
    }
};

// This handler acts as the entry point for your skill, routing all request and response
// payloads to the handlers above. Make sure any new handlers or interceptors you've
// defined are included below. The order matters - they're processed top to bottom.
exports.handler = Alexa.SkillBuilders.custom()
    .addRequestHandlers(
        LaunchRequestHandler,
        GetNewFactIntentHandler,
        HelpIntentHandler,
        CancelAndStopIntentHandler,
        SessionEndedRequestHandler,
        IntentReflectorHandler) // make sure IntentReflectorHandler is last so it doesn't override your custom intent handlers
    .addErrorHandlers(
        ErrorHandler)
    .lambda();
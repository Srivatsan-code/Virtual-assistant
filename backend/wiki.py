import wikipedia
import webscrap
inp=""
def wiki(inp):
    try:
        inp=inp.replace("what is","")
        inp=inp.replace("who is","")
        inp=inp.replace("tell me about","")
        inp=inp.replace("describe","")
        inp=inp.replace(" ", "")
        results = wikipedia.summary(inp, sentences=5)
        print(results)
        return(results)
    except:
        inp =webscrap.web_scraping(inp)
        return(inp)
       
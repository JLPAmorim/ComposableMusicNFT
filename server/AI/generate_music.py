# ------------------------------------------------ VARIABLES AND IMPORTS ------------------------------------------------
import os
import sys
import random
import numpy as np
import zaf
import wave

BASE_PATH = 'Datasets/cmn-ai-generated/'        # metadata base path
BASE_PATH_GENERATED = 'Generated/'              # file generation destination path

# ---------------------------------------------- ARGUMENTS FOR THE PROGRAM ----------------------------------------------
# check if number of arguments is correct and some debug
if (len(sys.argv) < 3):
    # argv[0] is the script name
    print ('\nUsage: ' + sys.argv[0] + ' <file name> <metadata>')
    sys.exit()

# ------------------------------------------------- AUXILIARY FUNCTIONS -------------------------------------------------
# idea is to be able to receive different queries and use all of them to generate music
def gen_metadata(selection_int):
    metadata = [] 
    # define the metadata array
    for i in range(len(sys.argv)-selection_int):
        i += selection_int # to take out the amount of arguments we want
        # calculate the full path of the metadata
        FULL_PATH = BASE_PATH + sys.argv[i]

        # does the full directory path exist?
        if (os.path.exists(FULL_PATH)):
            metadata.append(FULL_PATH)
        else:
            print('The inserted Metadata is incorrect.')
            sys.exit()
    return metadata

# select a batch of random files from a given folder
def batch_select_random_files_same_folder(folder, num_files):
    # get the files of the folder
    files = os.listdir(folder)
    files = [os.path.join(folder, f) for f in files if os.path.isfile(os.path.join(folder, f))]
    # batch of random files from this folder
    selected_files = random.sample(files, num_files) #doesn't repeat elements
    # a random shuffle, because why not
    random.shuffle(selected_files)
    return selected_files

# select a batch of random files, from different folders
def batch_select_random_files_different_folders(metadata, num_files):
    selected_files = []
    # get one sample at a time
    for i in range(num_files):
        # select a random folder to select from
        random_folder = random.sample(metadata, 1) # result is a list of one element
        # get just one random sample from this folder
        files = os.listdir(random_folder[0])
        files = [os.path.join(random_folder[0], f) for f in files if os.path.isfile(os.path.join(random_folder[0], f))]
        # since we are selecting one random sample at a time, we need to do some control to not repeat samples
        control = False
        while ( not control ):
            # select a random sample
            random_sample = random.sample(files, 1) # returns an array with only one element
            if random_sample[0] not in selected_files:
                # add the element to the folder
                selected_files += random_sample
                # and get out of the cycle
                control = True
            # if control is True, breaks out of cycle. If the random sample is already present on the array, get a new one
    
    # finally, a random shuffle, because why not
    random.shuffle(selected_files)
    return selected_files

# function to read audio files and return the audio signal, frequency and MDCT of it
def convert_samples_to_mdct(samples):
    audio_files = []
    # iterate through the selected samples
    for sample_path in samples:
        # Read the audio signal (normalized) with its sampling frequency in Hz
        audio_signal, sampling_frequency = zaf.wavread(sample_path)

        # Compute the Kaiser-Bessel-derived (KBD) window as used in the AC-3 audio coding format
        window_length = 1024 # big one to check all the 
        alpha_value = 5
        window_function = np.kaiser(int(window_length/2)+1, alpha_value*np.pi)
        window_function2 = np.cumsum(window_function[1:int(window_length/2)])
        window_function = np.sqrt(np.concatenate((window_function2, window_function2[int(window_length/2)::-1]))
                                  /np.sum(window_function))

        # Compute the MDCT
        audio_mdct = zaf.mdct(audio_signal, window_function)

        # create a tuple with all the file info
        audio_tuple = (sample_path, audio_signal, sampling_frequency, audio_mdct)

        # store this info
        audio_files.append(audio_tuple)

        # remove the suffix to save the images
        #suffix = ".wav"
        #line_new = sample_path.removesuffix(suffix)
        
        # Display the MDCT in dB, seconds, and Hz
        #number_samples = len(audio_signal)
        #plt.figure(figsize=(14, 7))
        #zaf.specshow(np.absolute(audio_mdct), number_samples, sampling_frequency, xtick_step=1, ytick_step=1000)
        #plt.tight_layout()
        #plt.axis('off')
        #plt.savefig(f'{line_new}.png', bbox_inches='tight', pad_inches=0)

    # and return all the audio files' info
    return audio_files

# ---------------------------------------------- RANDOM SAMPLES SELECTION ----------------------------------------------
# get the necessary metadata
generated_file_name = sys.argv[1] # the file name that it should be called
metadata = gen_metadata(2)

# how many random samples we want
num_samples = 10

# different random selections, to optimize this process
if (len(metadata) > 1 ):
    # if more than one dataset, random files from multiple folders with random folder selection
    samples = batch_select_random_files_different_folders(metadata, num_samples)
else:
    # just one dataset, so only need to get a batch of random samples from the same folder
    samples = batch_select_random_files_same_folder(metadata[0], num_samples)

# debug
print(samples)

#######################################################################################################################
#######################################################################################################################
#######################################################################################################################
#######################################################################################################################
#                                                                                                                     #
# NOTES: Now that we've selected the random samples, we need to mix them up to generate a music. There are multiple   #
#        ways to do this (using AI again, convert to signal images (MDCT for example) and interpolate between images, #
#        etc...). So, we have this external library (on zaf.py (all credits inside his library)) with multiple        #
#        functions for audio file manipulation.                                                                       #
#                                                                                                                     #
#        This needs intense investigation and testing, as different music genres operate with different instruments   #
#        and frequencies, so the same approach doesn't work for all of them...                                        #
#                                                                                                                     #
#        So, our approach is the simplest one: simply combine these samples up, by concatenating them.                #
#                                                                                                                     #
#######################################################################################################################
#######################################################################################################################
#######################################################################################################################
#######################################################################################################################

# --------------------------------------------------- GENERATE MUSIC --------------------------------------------------
#from scipy.io import wavfile
#import noisereduce as nr

# sample manipulation: remove noise(deletes too much noise, needs better samples. But it is a great option)
#for sample in samples:
#    # load data
#    rate, data = wavfile.read(sample)
#    # perform noise reduction
#    reduced_noise = nr.reduce_noise(y=data, sr=rate)
#    wavfile.write(sample, rate, reduced_noise)


outfile = BASE_PATH_GENERATED + generated_file_name + '.mp3'

# concatenate wav files
with wave.open(outfile, 'wb') as wav_out:
    for wav_path in samples:
        with wave.open(wav_path, 'rb') as wav_in:
            if not wav_out.getnframes():
                wav_out.setparams(wav_in.getparams())
            wav_out.writeframes(wav_in.readframes(wav_in.getnframes()))
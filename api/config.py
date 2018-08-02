

class Config(object):
    DEBUG = False
    TESTING = False
    PORT = 4000

class DevelopmentConfig(Config):
    DEBUG = True
    PORT = 4000

class ProductionConfig(Config):
    DEBUG = False
    PORT = 4000
    
